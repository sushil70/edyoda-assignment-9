// var url = 'http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D';



$(document).ready(() => {
    function rowCreater(data) {
        // alert("calling creater function")

        const created = `<tr class="data-row" id="${data.id}">
    <td class="column1">${data.id}</td>
    <td class="column2">${data.firstName}</td>
    <td class="column3">${data.lastName}</td>
    <td class="column4">${data.email}</td>
    <td class="column5">${data.phone}</td>
    </tr>`

        $('.tableBody').append(created)

        // alert("row created " + data)


    }

    // $.get( "http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D", function( data,status ) {
    //     console.log("first api call")
    //     if(status==="success"){
    //         var dataCollected = data
    //         for (var i = 0; i < dataCollected.length; i++) {

    //             rowCreater(data[i])
    //         }
    //     }
    // });


    $.get("https://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D", function (data) {
        // $(".result").html(data);
        // alert(data);
        var dataCollected = data
        for (var i = 0; i < dataCollected.length; i++) {

            rowCreater(data[i])
        }

        $('.data-row').click(function () {

            $('#info-content').css("display", "block")
            $('.data-row').removeClass("active")
            $(this).addClass("active")
            for (var i = 0; i < dataCollected.length; i++) {
                if(data[i].id == this.id){
                    $('#info-content').html(`<div><b>User selected:</b> ${data[i].firstName} ${data[i].lastName}</div><div><b>Description: </b><textarea cols="50" rows="5" readonly>${data[i].description}</textarea></div><div><b>Address:</b> ${data[i].address.streetAddress}</div><div><b>City:</b> ${data[i].address.city}</div><div><b>State:</b> ${data[i].address.state}<div><div><b>Zip:</b> ${data[i].address.zip}</div>`);
                }
            }

        })


        $('#search-box').on("keyup",function(e){
            var searchingString = $(this).val().toLowerCase()
            $(".data-row").remove();


            if(searchingString==""){
                for (var i = 0; i < dataCollected.length; i++) {

                    rowCreater(data[i])
                }

            }

            for (var i = 0; i < dataCollected.length; i++) {

                var comparingCollectedData = data[i].firstName.toLowerCase()
                var comparingFinder = comparingCollectedData.search(searchingString)

                if(comparingFinder >= 0){
                    const createdAfterSearch = `<tr class="data-row" id="${data[i].id}">
                    <td class="column1">${data[i].id}</td>
                    <td class="column2">${data[i].firstName}</td>
                    <td class="column3">${data[i].lastName}</td>
                    <td class="column4">${data[i].email}</td>
                    <td class="column5">${data[i].phone}</td>
                    </tr>`
                    $("tbody").append(createdAfterSearch)
                }
            }

            $('.data-row').click(function () {

                $('#info-content').css("display", "block")
                $('.data-row').removeClass("active")
                $(this).addClass("active")
                for (var i = 0; i < dataCollected.length; i++) {
                    if(data[i].id == this.id){
                        $('#info-content').html(`<div><b>User selected:</b> ${data[i].firstName} ${data[i].lastName}</div><div><b>Description: </b><textarea cols="50" rows="5" readonly>${data[i].description}</textarea></div><div><b>Address:</b> ${data[i].address.streetAddress}</div><div><b>City:</b> ${data[i].address.city}</div><div><b>State:</b> ${data[i].address.state}<div><div><b>Zip:</b> ${data[i].address.zip}</div>`);
                    }
                }
    
            })

        })
    });
})
