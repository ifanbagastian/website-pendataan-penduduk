var express = require('express');
var router = express.Router();
//var authentication_mdl = require('../middlewares/authentication');
var session_store;
/* GET Penduduk page. */
router.get('/',function(req, res, next) {
    req.getConnection(function(err,connection){
        var query = connection.query('SELECT * FROM tbpenduduk',function(err,rows)
        {
            if(err)
            var errornya = ("Error Selecting : %s ",err );
            req.flash('msg_error', errornya);
            res.render('penduduk/listPenduduk',{title:"Penduduk",data:rows,session_store:
            req.session});
        });
    //console.log(query.sql);
    });
 });
module.exports = router;
router.post('/addpenduduk',function(req, res, next){
    req.assert('nik', 'Tolong isi NIK').notEmpty();
    var errors = req.validationErrors();
    if (!errors) {
        v_nik = req.sanitize( 'nik' ).escape().trim();
        v_nama = req.sanitize( 'nama' ).escape().trim();
        v_jeniskelamin = req.sanitize( 'jeniskelamin' ).escape().trim();
        v_alamat = req.sanitize( 'alamat' ).escape();
        v_agama = req.sanitize( 'agama' ).escape();
        v_pekerjaan = req.sanitize( 'pekerjaan' ).escape();
        var penduduk = {
            nik: v_nik,
            nama: v_nama,
            jeniskelamin: v_jeniskelamin, 
            alamat: v_alamat,
            agama : v_agama,
            pekerjaan: v_pekerjaan,
        }
        var insert_sql = 'INSERT INTO tbpenduduk SET ?';
        req.getConnection(function(err,connection){
            var query = connection.query(insert_sql, penduduk, function(err, result){
                if(err)
                {
                    var errors_detail = ("Error Insert : %s ",err );
                    req.flash('msg_error', errors_detail);
                    res.render('penduduk/addPenduduk',
                    {
                        nik: req.param('nik'),
                        nama: req.param('nama'),
                        jeniskelamin: req.param('jeniskelamin'),
                        alamat: req.param('alamat'),
                        agama: req.param('agama'),
                        pekerjaan: req.param('pekerjaan'),
                    });
                }
                else{
                    req.flash('msg_info', 'Berhasil menambah data');
                    res.redirect('/penduduk');
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
        res.render('penduduk/addPenduduk',
        {
            nik: req.param('nik'),
            nama: req.param('nama')
        });
    }
});
router.get('/addpenduduk', function(req, res, next) {
    9
    res.render( 'penduduk/addPenduduk',
    {
        title: 'Add New Penduduk',
        nik: '',
        nama: '',
        jeniskelamin:'',
        alamat:'',
        agama:'',
        pekerjaan:'',
    });
});
router.get('/editpenduduk/(:id)', function(req,res,next){
    req.getConnection(function(err,connection){
        var query = connection.query('SELECT * FROM tbpenduduk where id='+req.params.id,function(err,rows)
        {
            if(err)
            {
                var errornya = ("Error Selecting : %s ",err );
                req.flash('msg_error', errors_detail);
                res.redirect('/penduduk');
            }
            else
            {
                if(rows.length <=0)
                {
                    req.flash('msg_error', "Penduduk tidak ditemukan");
                    res.redirect('/penduduk');
                }
                else
                {
                    console.log(rows);
                    res.render('penduduk/editPenduduk',{title:"Edit ",data:rows[0]});
                }
            }
        });
    });
});
router.put('/editpenduduk/(:id)', function(req,res,next){
    req.assert('nik', 'Tolong isi NIK').notEmpty();
    var errors = req.validationErrors();
    if (!errors) {
        10
        v_nik = req.sanitize( 'nik' ).escape().trim();
        v_nama = req.sanitize( 'nama' ).escape().trim();
        v_jeniskelamin = req.sanitize( 'jeniskelamin' ).escape().trim();
        v_alamat = req.sanitize( 'alamat' ).escape();
        v_agama = req.sanitize( 'agama' ).escape();
        v_pekerjaan = req.sanitize( 'pekerjaan' ).escape();
        
        var penduduk = {
            nik: v_nik,
            nama: v_nama,
            jeniskelamin: v_jeniskelamin, 
            alamat: v_alamat,
            agama : v_agama,
            pekerjaan: v_pekerjaan,
        }
        var update_sql = 'update tbpenduduk SET ? where id = '+req.params.id;
        req.getConnection(function(err,connection){
            var query = connection.query(update_sql, penduduk, function(err, result){
                if(err)
                {
                    var errors_detail = ("Error Update : %s ",err );
                    req.flash('msg_error', errors_detail);
                    res.render('penduduk/editPenduduk',
                    {
                        nik: req.param('nik'),
                        nama: req.param('nama'),
                        jeniskelamin: req.param('jeniskelamin'),
                        alamat: req.param('alamat'),
                        agama: req.param('agama'),
                        pekerjaan: req.param('pekerjaan'),
                    });
                }
                else{
                    req.flash('msg_info', 'Berhasil memperbarui penduduk');
                    res.redirect('/penduduk/editpenduduk/'+req.params.id);
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
        res.render('penduduk/addPenduduk',
        {
            nik: req.param('nik'),
            nama: req.param('nama')
        });
    }
});
router.delete('/deletependuduk/(:id)', function(req, res, next) {
    req.getConnection(function(err,connection){
        var penduduk = {
            id: req.params.id,
        }
        var delete_sql = 'delete from tbpenduduk where ?';
        req.getConnection(function(err,connection){
            var query = connection.query(delete_sql, penduduk, function(err, result){
                if(err)
                {
                    var errors_detail = ("Error Delete : %s ",err);
                    req.flash('msg_error', errors_detail);
                    res.redirect('/penduduk');
                }
                else{
                    req.flash('msg_info', 'Berhasil hapus penduduk');
                    res.redirect('/penduduk');
                }
            });
        });
    });
});