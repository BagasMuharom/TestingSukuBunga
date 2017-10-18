let dataWeightManual = [];
let biasManual;

var cekJenis = function(data) {
    return (data === 1) ? 'Naik' : (data === 0.5) ? 'Tetap' : (data === 0) ? 'Turun' : data
}

var testing = function(weight, data, bias) {

    function logsig(y_in) {
        return 1 / (1 + Math.exp(-y_in))
    }

    function sigma() {
        let total = 0 

        for(index in weight) {
            total += weight[index] * data[index]
        }

        return total
    }

    let y_in = bias + sigma()
    let y = logsig(y_in)
    
    return y
}

$('#pilih_weight_manual').click((e) => {
    dialog.showOpenDialog((fileNames) => {
        fs.readFile(fileNames[0], 'utf-8', (err, data) => {
            if(!err) {
                dataWeightManual = []
                biasManual = Number(data.split('\n')[1])
                for(i in data.split('\n')[0].split(' ')) {
                    dataWeightManual.push(Number(data.split('\n')[0].split(' ')[i]))
                }
                console.log(dataWeightManual)
                console.log(biasManual)
            }
        })
    })
})

$('#testing_manual').click((e) => {
    let x = []
    for (var i = 0; i < $('select[name="x[]"]').length; i++) {
        let val = $('select[name="x[]"]').eq(i).val()
        x.push(Number(val))   
    }

    var test = testing(dataWeightManual, x, biasManual)

    if(isNaN(test)) {
        alert('Silahkan pilih weight terlebih dahulu !')
    }
    else {
        alert(test)
    }
    console.log(test)
})