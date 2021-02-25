var express = require('express');
var router = express.Router();
//var authentication_mdl = require('../middlewares/authentication');
var session_store;
/* GET Penduduk page. */
router.get('/',function(req, res, next) {
    req.getConnection(function(err,connection){
        var query = connection.query('SELECT * FROM tbkelahiran',function(err,rows)
        {
            if(err)
            var errornya = ("Error Selecting : %s ",err );
            req.flash('msg_error', errornya);
            res.render('kelahiran/listKelahiran',{title:"Kelahiran",data:rows,session_store:
            req.session});
        });
    //console.log(query.sql);
    });
 });
module.exports = router;
router.post('/addkelahiran',function(req, res, next){
    req.assert('nama', 'Tolong isi Nama').notEmpty();
    var errors = req.validationErrors();
    if (!errors) {
        v_nama = req.sanitize( 'nama' ).escape().trim();
        v_ttl = req.sanitize( 'ttl' ).escape().trim();
        v_jeniskelamin = req.sanitize( 'jeniskelamin' ).escape().trim();
        v_kplkeluarga = req.sanitize( 'kplkeluarga' ).escape();
        var kelahiran = {
            nama: v_nama,
            ttl: v_ttl,
            jeniskelamin: v_jeniskelamin, 
            kplkeluarga: v_kplkeluarga,
        }
        var insert_sql = 'INSERT INTO tbkelahiran SET ?';
        req.getConnection(function(err,connection){
            var query = connection.query(insert_sql, kelahiran, function(err, result){
                if(err)
                {
                    var errors_detail = ("Error Insert : %s ",err );
                    req.flash('msg_error', errors_detail);
                    res.render('kelahiran/addKelahiran',
                    {
                        nama: req.param('nama'),
                        ttl: req.param('ttl'),
                        jeniskelamin: req.param('jeniskelamin'),
                        kplkeluarga: req.param('kplkeluarga'),
                    });
                }
                else{
                    req.flash('msg_info', 'Berhasil menambah data');
                    res.redirect('/kelahiran');
                }
            });
        });
    }
    else{
        console.log(errors);
        errors_detail = "Sory there are error <ul>";
        for (i in errors)
        {
            error = errors[i];
            errors_detail += '<li>'+error.msg+'</li>';
        }
        errors_detail += "</ul>";
        req.flash('msg_error', errors_detail);
        res.render('kelahiran/addKelahiran',
        {
            nama: req.param('nama'),
            ttl: req.param('ttl')
        });
    }
});
router.get('/addkelahiran', function(req, res, next) {
    9
    res.render( 'kelahiran/addKelahiran',
    {
        title: 'Add New Kelahiran',
        nama: '',
        ttl: '',
        jeniskelamin:'',
        kplkeluarga:'',
    });
});
router.get('/editkelahiran/(:id)', function(req,res,next){
    req.getConnection(function(err,connection){
        var query = connection.query('SELECT * FROM tbkelahiran where id='+req.params.id,function(err,rows)
        {
            if(err)
            {
                var errornya = ("Error Selecting : %s ",err );
                req.flash('msg_error', errors_detail);
                res.redirect('/kelahiran');
            }
            else
            {
                if(rows.length <=0)
                {
                    req.flash('msg_error', "kelahiran tidak ditemukan");
                    res.redirect('/kelahiran');
                }
                else
                {
                    console.log(rows);
                    res.render('kelahiran/editKelahiran',{title:"Edit ",data:rows[0]});
                }
            }
        });
    });
});
router.put('/editkelahiran/(:id)', function(req,res,next){
    req.assert('nama', 'Tolong isi Nama').notEmpty();
    var errors = req.validationErrors();
    if (!errors) {
        10
        v_nama = req.sanitize( 'nama' ).escape().trim();
        v_ttl = req.sanitize( 'ttl' ).escape().trim();
        v_jeniskelamin = req.sanitize( 'jeniskelamin' ).escape().trim();
        v_kplkeluarga = req.sanitize( 'kplkeluarga' ).escape();
        var kelahiran = {
            nama: v_nama,
            ttl: v_ttl,
            jeniskelamin: v_jeniskelamin, 
            kplkeluarga: v_kplkeluarga,
        }
        var update_sql = 'update tbkelahiran SET ? where id = '+req.params.id;
        req.getConnection(function(err,connection){
            var query = connection.query(update_sql, kelahiran, function(err, result){
                if(err)
                {
                    var errors_detail = ("Error Update : %s ",err );
                    req.flash('msg_error', errors_detail);
                    res.render('kelahiran/editKelahiran',
                    {
                        nama: req.param('nama'),
                        ttl: req.param('ttl'),
                        jeniskelamin: req.param('jeniskelamin'),
                        kplkeluarga: req.param('kplkeluarga'),
                    });
                }
                else{
                    req.flash('msg_info', 'Berhasil memperbarui kelahiran');
                    res.redirect('/kelahiran/editkelahiran/'+req.params.id);
                }
            });
        });
    }
    else{
        console.log(errors);
        errors_detail = "Sory there are error<ul>";
        for (i in errors)
        {
        error = errors[i];
        errors_detail += '<li>'+error.msg+'</li>';
        }
        errors_detail += "</ul>";
        req.flash('msg_error', errors_detail);
        res.render('kelahiran/addKelahiran',
        {
            nama: req.param('nama'),
            ttl: req.param('ttl')
        });
    }
});
router.delete('/deletekelahiran/(:id)', function(req, res, next) {
    req.getConnection(function(err,connection){
        var kelahiran = {
            id: req.params.id,
        }
        var delete_sql = 'delete from tbkelahiran where ?';
        req.getConnection(function(err,connection){
            var query = connection.query(delete_sql, kelahiran, function(err, result){
                if(err)
                {
                    var errors_detail = ("Error Delete : %s ",err);
                    req.flash('msg_error', errors_detail);
                    res.redirect('/kelahiran');
                }
                else{
                    req.flash('msg_info', 'Berhasil hapus kelahiran');
                    res.redirect('/kelahiran');
                }
            });
        });
    });
});