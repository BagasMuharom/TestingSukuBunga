const {app, BrowserWindow} = require('electron')
const url = require('url')

app.on('ready', () => {
    let win = new BrowserWindow({
        minWidth: 800,
        minHeight: 500
    })
    //win.setMenu(null)
    win.loadURL(url.format({
        pathname : 'view/index.html',
        slashes : true
    }))
})