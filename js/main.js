$('document').ready(function(){
    var specs,
        price,
        specsHolder,
        priceHolder,
        priceUSDHolder;
    
    specsHolder = $('#characteristic');
    priceHolder = $('#price');
    priceUSDHolder = $('#price-dollar')

    price = 0;
    specs = ('');
    
    $('#submit').on('click', function(){
        alert('Учебная версия сайта, данная действия не доступна');
    });
    
    function calculatePrice(){
        
        var priceengine = $('input[name=engine]:checked', '#radio-button').val();
        var pricekorobka = $('input[name=korobka]:checked', '#radio-button').val();
        var pricepaket = $('input[name=paket]:checked', '#radio-button').val();
        priceengine = parseInt(priceengine);
        pricekorobka = parseInt(pricekorobka);
        pricepaket = parseInt(pricepaket);

        price = priceengine + pricekorobka + pricepaket;
    };

    function calculateSpecs(){
        specs = $('input[name=engine]:checked + label', '#radio-button').text();
        specs = specs + ', ' + $('input[name=korobka]:checked + label', '#radio-button').text();
        specs = specs + ', ' + $('input[name=paket]:checked + label', '#radio-button').text();

        specsHolder.text(specs);
    }

    $('#radio-button input').on('change', function(){
        calculatePrice();
        priceHolder.text(numberWithSpaces(price) + 'тг');
        calculateSpecs();
        course ();
    });
    
    calculateSpecs();
    calculatePrice();
    priceHolder.text(numberWithSpaces(price) + 'тг');
    course ();
    

    const rates = {};
    
    

    async function course () {
        const response = await fetch('https://www.cbr-xml-daily.ru/daily_json.js');
        const data = await response.json();
        const result = await data;
        

        rates.USD = result.Valute.USD.Value;
        rates.KZT = result.Valute.KZT.Value;
        

        var normalUsd;
        rates.USD = parseInt(rates.USD);
        rates.KZT = parseInt(rates.KZT);
        
        normalUsd = (rates.USD * 100) / rates.KZT;
        normalUsd = price / normalUsd;
        priceUSDHolder.text('$ ' + numberWithSpaces(normalUsd.toFixed(2)));
        

    };

    


    $('#custom-color .color').on('click', function() {

        var imgPath;
        imgPath = $(this).attr('data-img-cust');
        $('#color-cust').attr('src', imgPath)

    });

    function numberWithSpaces(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }

});