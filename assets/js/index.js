console.log("from index.js");

$('#temp').submit(function(event){
    console.log('temp clicked')
    event.preventDefault();

    let unindexed_array = $(this).serializeArray();
    let data = {};

    $.map(unindexed_array,function(n,i){
        data[n['name']] = n['value'];
    })
    console.log('data from index.js', data, data.id)

    let request = $.ajax({
        url: "https://corwell.herokuapp.com//api/products/"+data.id, 
        type: 'PUT',   //type is any HTTP method
        data: data,
        success: function () {
            console.log('success')
        }
    });

    $.ajax(request).done(function(response){
        alert('product updated');
    })
})

$('.btn_delete_product').click(function(){
    //event.persist();
    if (confirm('are you sure you want to delete it?')){
        const product_id = $(this).attr('data_id')
        //event.target.attributes.data_id
        console.log(product_id);
        
        let request = $.ajax({
            url: "https://corwell.herokuapp.com//api/products/"+product_id, 
            type: 'DELETE',   //type is any HTTP method
            data: {id: product_id},
            success: function () {
                console.log('successfully deleted')
            }
        });
    
        $.ajax(request).done(function(response){
            alert('product deleted');
        })
        
        location.reload();
    }
})


