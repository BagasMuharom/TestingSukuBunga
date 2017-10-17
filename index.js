const {app, BrowserWindow} = require('electron')
const url = require('url')

app.on('ready', () => {
    let win = new BrowserWindow({
        resizable: false
    })
    //win.setMenu(null)
    win.loadURL(url.format({
        pathname : 'view/index.html',
        slashes : true
    }))
})