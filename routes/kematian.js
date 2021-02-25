var express = require('express');
var router = express.Router();
//var authentication_mdl = require('../middlewares/authentication');
var session_store;
/* GET Penduduk page. */
router.get('/',function(req, res, next) {
    req.getConnection(function(err,connection){
        var query = connection.query('SELECT * FROM tbkematian',function(err,rows)
        {
            if(err)
            var errornya = ("Error Selecting : %s ",err );
            req.flash('msg_error', errornya);
            res.render('kematian/listKematian',{title:"Kematian",data:rows,session_store:
            req.session});
        });
    //console.log(query.sql);
    });
 });
module.exports = router;
router.post('/addkematian',function(req, res, next){
    req.assert('nik', 'Tolong isi nik').notEmpty();
    var errors = req.validationErrors();
    if (!errors) {
        v_nik = req.sanitize( 'nik' ).escape().trim();
        v_nama = req.sanitize( 'nama' ).escape().trim();
        v_tglmeninggal = req.sanitize( 'tglmeninggal' ).escape().trim();
        v_penyebab = req.sanitize( 'penyebab' ).escape();
        var kematian = {
            nik: v_nik,
            nama: v_nama,
            tglmeninggal: v_tglmeninggal, 
            penyebab: v_penyebab,
        }
        var insert_sql = 'INSERT INTO tbkematian SET ?';
        req.getConnection(function(err,connection){
            var query = connection.query(insert_sql, kematian, function(err, result){
                if(err)
                {
                    var errors_detail = ("Error Insert : %s ",err );
                    req.flash('msg_error', errors_detail);
                    res.render('kematian/addKematian',
                    {
                        nik: req.param('nik'),
                        nama: req.param('nama'),
                        tglmeninggal: req.param('tglmeninggal'),
                        penyebab: req.param('penyebab'),
                    });
                }
                else{
                    req.flash('msg_info', 'Berhasil menambah data');
                    res.redirect('/kematian');
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
        res.render('kematian/addKematian',
        {
            nik: req.param('nik'),
            nama: req.param('nama')
        });
    }
});
router.get('/addkematian', function(req, res, next) {
    9
    res.render( 'kematian/addKematian',
    {
        title: 'Add New Kematian',
        nik: '',
        nama: '',
        tglmeninggal:'',
        penyebab:'',
    });
});
router.get('/editkematian/(:id)', function(req,res,next){
    req.getConnection(function(err,connection){
        var query = connection.query('SELECT * FROM tbkematian where id='+req.params.id,function(err,rows)
        {
            if(err)
            {
                var errornya = ("Error Selecting : %s ",err );
                req.flash('msg_error', errors_detail);
                res.redirect('/kematian');
            }
            else
            {
                if(rows.length <=0)
                {
                    req.flash('msg_error', "kematian tidak ditemukan");
                    res.redirect('/kematian');
                }
                else
                {
                    console.log(rows);
                    res.render('kematian/editKematian',{title:"Edit ",data:rows[0]});
                }
            }
        });
    });
});
router.put('/editkematian/(:id)', function(req,res,next){
    req.assert('nik', 'Tolong isi NIK').notEmpty();
    var errors = req.validationErrors();
    if (!errors) {
        10
        v_nik = req.sanitize( 'nik' ).escape().trim();
        v_nama = req.sanitize( 'nama' ).escape().trim();
        v_tglmeninggal = req.sanitize( 'tglmeninggal' ).escape().trim();
        v_penyebab = req.sanitize( 'penyebab' ).escape();
        var kematian = {
            nik: v_nik,
            nama: v_nama,
            tglmeninggal: v_tglmeninggal, 
            penyebab: v_penyebab,
        }
        var update_sql = 'update tbkematian SET ? where id = '+req.params.id;
        req.getConnection(function(err,connection){
            var query = connection.query(update_sql, kematian, function(err, result){
                if(err)
                {
                    var errors_detail = ("Error Update : %s ",err );
                    req.flash('msg_error', errors_detail);
                    res.render('kematian/editKematian',
                    {
                        nik: req.param('nik'),
                        nama: req.param('nama'),
                        tglmeninggal: req.param('tglmeninggal'),
                        penyebab: req.param('penyebab'),
                    });
                }
                else{
                    req.flash('msg_info', 'Berhasil memperbarui kematian');
                    res.redirect('/kematian/editkematian/'+req.params.id);
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
        res.render('kematian/addKematian',
        {
            nik: req.param('nik'),
            nama: req.param('nama')
        });
    }
});
router.delete('/deletekematian/(:id)', function(req, res, next) {
    req.getConnection(function(err,connection){
        var kematian = {
            id: req.params.id,
        }
        var delete_sql = 'delete from tbkematian where ?';
        req.getConnection(function(err,connection){
            var query = connection.query(delete_sql, kematian, function(err, result){
                if(err)
                {
                    var errors_detail = ("Error Delete : %s ",err);
                    req.flash('msg_error', errors_detail);
                    res.redirect('/kematian');
                }
                else{
                    req.flash('msg_info', 'Berhasil hapus kematian');
                    res.redirect('/kematian');
                }
            });
        });
    });
});