let dataWeightAutomatic = []
let dataTestingAutomatic = []
let dataTarget = []
let biasAutomatic

$('#pilih-data-testing').click((e) => {
    dialog.showOpenDialog((fileNames) => {
        fs.readFile(fileNames[0], 'utf-8', (err, data) => {
            if(!err) {
                dataTestingAutomatic = []
                let semuaData = data.split('\n')
                for(baris in semuaData) {
                    let temp = []
                    let dataPerbaris = semuaData[baris].split(' ')
                    for(kolom in dataPerbaris)
                        temp.push(Number(dataPerbaris[kolom].replace(',', '.')))
                    dataTestingAutomatic.push(temp)
                }
                console.log(dataTestingAutomatic)
            }
        })
    })
})

$('#pilih-weight-automatic').click((e) => {
    dialog.showOpenDialog((fileNames) => {
        fs.readFile(fileNames[0], 'utf-8', (err, data) => {
            if(!err) {
                dataWeightAutomatic = []
                biasAutomatic = Number(data.split('\n')[1])
                for(i in data.split('\n')[0].split(' '))
                    dataWeightAutomatic.push(Number(data.split('\n')[0].split(' ')[i]))
                console.log(dataWeightAutomatic)
                console.log(biasAutomatic)
            }
        })
    })
})

$('#pilih-target').click((e) => {
    dialog.showOpenDialog((fileNames) => {
        fs.readFile(fileNames[0], 'utf-8', (err, data) => {
            if(!err) {
                dataWeightAutomatic = []
                for(i in data.split('\n'))
                    dataTarget.push(Number(data.split('\n')[i].replace(',', '.')))
            }
        })
    })
})

$('#testing-automatic').click((e) => {
    let tabel = $('#hasil-testing-automatic')
    let tbody = tabel.find('tbody').eq(0)

    tabel.hide()
    tbody.html('')

    // Melakukan testing per data testing
    for(baris in dataTestingAutomatic) {
        let hasil = testing(dataWeightAutomatic, dataTestingAutomatic[baris], biasAutomatic)

        // Mencetak pada tabel hasil testing
        var tr = $('<tr></tr>')
        for(kolom in dataTestingAutomatic[baris]) {
            tr.append('<td>' + cekJenis(dataTestingAutomatic[baris][kolom]) + '</td>')
            console.log(baris + " " + kolom + " " + dataTestingAutomatic[baris][kolom])
        }
        tr.append('<td style="color: ' + ((hasil === dataTarget[baris]) ? 'green' : 'red') + '">' + cekJenis(hasil) + '</td>')
        tr.append('<td style="color: ' + ((hasil === dataTarget[baris]) ? 'green' : 'red') + '">' + cekJenis(dataTarget[baris]) + '</td>')

        tbody.append(tr)
        
    }

    tabel.show();
})