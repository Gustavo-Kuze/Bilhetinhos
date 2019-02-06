const getDinos = () => {
    let dinos = firebase.database().ref('dinosaurs/')
    dinos.on('value', (snapshot) => {
        const tBody = document.getElementById('t-body')
        tBody.innerHTML = ''
        Object.entries(snapshot.val()).map(k => {
            let tr = document.createElement('tr')
            let tdName = document.createElement('td')
            let tdHeight = document.createElement('td')
            tdName.innerHTML = k[0]
            tdHeight.innerHTML = k[1].height
            tr.appendChild(tdName)
            tr.appendChild(tdHeight)
            tBody.appendChild(tr)
            console.log(k)
        })
    })
}

const setDino = (e) => {
    firebase.database().ref(`dinosaurs/`).child(e.name.value).set({
        height: parseInt(e.height.value)
    })
    getDinos()
    return false;
}

getDinos()