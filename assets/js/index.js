console.log("from index.js");

//const deployment_url = 'http://localhost:3000';
const deployment_url = 'https://corwell.herokuapp.com';

$('#temp').submit(function(event){
    //console.log('temp clicked')
    event.preventDefault();

    let unindexed_array = $(this).serializeArray();
    let data = {};

    $.map(unindexed_array,function(n,i){
        data[n['name']] = n['value'];
    })
    console.log('data from index.js', data, data.id)

    let request = $.ajax({
        //url: `${process.env.URL}/api/products/${data.id}`, 
        url: `${deployment_url}/api/products/${data.id}`, 
        type: 'PUT',   //type is any HTTP method
        data: data,
        success: function () {
            console.log('Success')
        }
    });

    $.ajax(request).done(function(response){
        alert('Product Updated');
    })
})

$('.btn_delete_product').click(function(){
    //event.persist();
    if (confirm('Are you sure you want to DELETE it?')){
        const product_id = $(this).attr('data_id')
        //event.target.attributes.data_id
        console.log(product_id);
        
        let request = $.ajax({
            url: `${deployment_url}/api/products/${product_id}`, 
            type: 'DELETE',   //type is any HTTP method
            data: {id: product_id},
            success: function () {
                console.log('Successfully Deleted')
            }
        });
        
        $.ajax(request).done(function(response){
            alert('Product Deleted');
        })
        
        location.reload();
    }
})


