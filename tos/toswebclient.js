if ('WebSocket' in window) {

    var traoStat = document.getElementById('statTRAO');
    var mainBtn = document.getElementById('btnMain');
    var rainBtn = document.getElementById('btnRain');
    var breaBtn = document.getElementById('btnBrea');
    var onobBtn = document.getElementById('btnOnob');
    var mealBtn = document.getElementById('btnMeal');
    var awayBtn = document.getElementById('btnAway');
    var obsrBtn = document.getElementById('btnObsr');
    var remoBtn = document.getElementById('btnRemo');
    var allBtns = ['btnMain', 'btnRain', 'btnBrea', 'btnOnob', 'btnMeal', 'btnAway', 'btnObsr', 'btnRemo'];
    var obsNow = document.getElementById('obsNow');
    var loginType = document.getElementById('iptLoginType');
    var userName = document.getElementById('iptUserName');
    var passWord = document.getElementById('iptPassWord');
    var loginBtn = document.getElementById('btnLogin');
    var sendChat = document.getElementById('btnChat');
    var chatLog = document.getElementById('logChat');
    var chatInput = document.getElementById('iptChat');
    var inputLogin = document.getElementById('divBeforeLogin');
    var inputChat = document.getElementById('divAfterLogin');
    var audioLog = document.getElementById('logAudio');

    var serverIP = '100.40.2.65';
    var loginUser = 'none';
    var staffLogin = false;
    var userLogin = false;
    var obsName = 'Unknown';
    var onObs = false;
    var obsStat = 'none';
    var recentDate = '20230101';

    function changeLayout() {
        if (window.innerWidth > 1250) {
            document.getElementById('tosLayout').style.flexDirection = 'row';
        } else {
            document.getElementById('tosLayout').style.flexDirection = 'column';
        }
    };
    
    changeLayout();
    window.addEventListener('resize', changeLayout);

    function showMessage(message) {
        const chatArr = message.split('|');
        let iChat = tagTime(chatArr[0])
        switch (chatArr[2]) {
            case '__notice__':
                iChat += '<span style=\'color: #009688;\'>~&nbsp;';
                iChat += chatArr[3];
                iChat += '&nbsp;~</span></p>';
                break;
            case '__status__':
                iChat += '<span style=\'color: #FFC107;\'>~&nbsp;';
                iChat += chatArr[3];
                iChat += '&nbsp;~</span></p>';
                break;
            case 'TRAO&nbsp;staff':
                iChat += '<span style=\'color: #F44336;\'>TRAO&nbsp;staff</span>&nbsp;&nbsp;';
                iChat += '<span style=\'color: #EEEEEE;\'>';
                iChat += chatArr[3];
                iChat += '</span></p>';
                break;
            default:
                iChat += '<span style=\'color: #4CAF50;\'>';
                iChat += chatArr[2];
                iChat += '</span>&nbsp;&nbsp;<span style=\'color: #CCCCCC;\'>';
                iChat += chatArr[3];
                iChat += '</span></p>';
        }
        chatLog.innerHTML += iChat;
        chatLog.scrollTop = chatLog.scrollHeight;
        chatInput.focus();
        chatInput.select();
    };

    function tagTime(data) {
        let newDateTime = data.split('_')
        let iTag = '<p><span style=\'font-size: 10px; color: #999999; vertical-align: middle;\'>';
        iTag += newDateTime[1];
        iTag += '</span>&nbsp;';
        if (newDateTime[0] !== recentDate) {
            recentDate = newDateTime[0];
            let nD = new Date(`${recentDate.slice(0, 4)}-${recentDate.slice(4, 6)}-${recentDate.slice(6, 8)}`);
            let newDate = `<p style='text-align: center;'><span style='font-size: 10px; color: #999999; vertical-align: middle;'>`;
            newDate += `${nD.toString().slice(0, 15)}</span></p>`;
            chatLog.innerHTML += newDate;
            chatLog.scrollTop = chatLog.scrollHeight;
        }
        return iTag;
    };

    function updateTime(data) {
        const timeArr = data.split('|')
        document.getElementById('traoDate').innerHTML = timeArr[2];
        document.getElementById('traoKST').innerHTML = timeArr[3];
        document.getElementById('traoUT').innerHTML = timeArr[4];
        document.getElementById('traoLST').innerHTML = timeArr[5];
    };

    var ws = new WebSocket(`wss://${serverIP}:8220`);

    ws.onopen = function() {
        console.log('Connected to Server'); 
    };

    ws.onmessage = function ({data}) {
        const dataArr = data.split('|');
        switch (dataArr[1]) {
            case '__login__':
                switch (dataArr[3]) {
                    case '__userLoginSuccess__':
                        loginUser = dataArr[2];
                        userLogin = true;
                        staffLogin = false;
                        inputLogin.style.display = 'none';
                        inputChat.style.display = 'flex';
                        chatInput.placeholder = `${loginUser.replaceAll('&nbsp;', ' ')}: Type your message here`;
                        chatInput.focus();
                        chatInput.select();
                        break;
                    case '__staffLoginSuccess__':
                        loginUser = dataArr[2];
                        staffLogin = true;
                        userLogin = true;
                        inputLogin.style.display = 'none';
                        inputChat.style.display = 'flex';
                        chatInput.placeholder = `${loginUser.replaceAll('&nbsp;', ' ')}: Type your message here`;
                        chatInput.focus();
                        chatInput.select();
                        break;
                    case '__wrongPass__':
                        userLogin = false;
                        staffLogin = false;
                        alert('ERROR: TRAO staff password is wrong!');
                        passWord.value = '';
                        passWord.focus();
                        passWord.select();
                        break;
                    case '__emptyName__':
                        userLogin = false;
                        staffLogin = false;
                        alert('ERROR: Observer\'s name is empty!');
                        userName.focus();
                        userName.select();
                        break;
                    case '__userLogout__':
                        loginUser = 'none';
                        staffLogin = false;
                        userLogin = false;
                        inputLogin.style.display = 'flex';
                        inputChat.style.display = 'none';
                        chatInput.placeholder = `Please, login to send message.`;
                        break;
                    default:
                        userLogin = false;
                        staffLogin = false;
                        inputLogin.style.display = 'flex';
                        inputChat.style.display = 'none';
                }
                break;
            case '__status__':
                if (document.hidden) {
                    audioLog.play();
                }
                obsStat = dataArr[2];
                obsName = dataArr[3];
                for (let i = 0; i < allBtns.length; i++) {
                    document.getElementById(allBtns[i]).style.color = '#333333';
                    document.getElementById(allBtns[i]).style.backgroundColor = '#222222';
                }
                obsNow.innerHTML = obsName;
                switch (obsStat) {
                    case '__main__':
                        traoStat.style.color = 'white';
                        traoStat.style.backgroundColor = 'red';
                        mainBtn.style.color = 'white';
                        mainBtn.style.backgroundColor = 'red';
                        obsNow.style.color = '#F44336';
                        onObs = false;
                        break;
                    case '__rain__':
                        traoStat.style.color = 'white';
                        traoStat.style.backgroundColor = 'blue';
                        rainBtn.style.color = 'white';
                        rainBtn.style.backgroundColor = 'blue';
                        obsNow.style.color = '#2196F3';
                        onObs = false;
                        break;
                    case '__brea__':
                        traoStat.style.color = 'white';
                        traoStat.style.backgroundColor = '#222222';
                        breaBtn.style.color = 'black';
                        breaBtn.style.backgroundColor = 'white';
                        obsNow.style.color = '#444444';
                        onObs = false
                        break;
                    case '__onob__':
                        traoStat.style.color = 'white';
                        traoStat.style.backgroundColor = 'green';
                        onobBtn.style.color = 'white';
                        onobBtn.style.backgroundColor = 'green';
                        obsrBtn.style.color = 'black';
                        obsrBtn.style.backgroundColor = 'white';
                        obsNow.style.color = 'Lime';
                        onObs = true;
                        break;
                    case '__obsr__':
                        traoStat.style.color = 'white';
                        traoStat.style.backgroundColor = 'green';
                        onobBtn.style.color = 'white';
                        onobBtn.style.backgroundColor = 'green';
                        obsrBtn.style.color = 'black';
                        obsrBtn.style.backgroundColor = 'white';
                        obsNow.style.color = 'Lime';
                        onObs = true;
                        break;
                    case '__meal__':
                        traoStat.style.color = 'white';
                        traoStat.style.backgroundColor = 'green';
                        onobBtn.style.color = 'white';
                        onobBtn.style.backgroundColor = 'green';
                        mealBtn.style.color = 'black';
                        mealBtn.style.backgroundColor = 'cyan';
                        obsNow.style.color = 'Lime';
                        onObs = true;
                        break;
                    case '__away__':
                        traoStat.style.color = 'white';
                        traoStat.style.backgroundColor = 'green';
                        onobBtn.style.color = 'white';
                        onobBtn.style.backgroundColor = 'green';
                        awayBtn.style.color = 'black';
                        awayBtn.style.backgroundColor = 'yellow';
                        obsNow.style.color = 'Lime';
                        onObs = true;
                        break;
                    case '__remo__':
                        traoStat.style.color = 'white';
                        traoStat.style.backgroundColor = 'magenta';
                        onobBtn.style.color = 'white';
                        onobBtn.style.backgroundColor = 'magenta';
                        remoBtn.style.color = 'white';
                        remoBtn.style.backgroundColor = 'magenta';
                        obsNow.style.color = 'Violet';
                        onObs = true;
                        break;
                }
                break;
            case '__chat__':
                if (document.hidden) {
                    audioLog.play();
                }
                showMessage(`${data}`);
                break;
            case '__time__':
                updateTime(`${data}`);
                break;
            default:
                console.log(`${data}`)
        }
    };

    ws.onclose = function() { 
        try {
            ws = new WebSocket(`wss://${serverIP}:8220`);
        } catch (error) {
            console.log(error);
        } finally {
            ws = null;
            alert('ERROR: Connection closed. Refresh to try again!\nIf that doesn\'t work, contact to TRAO staff.');
        }
    };

    loginType.onchange = function() {
        if (loginType.value === 'traostaff') {
            userName.style.display = 'none';
            passWord.style.display = 'block';
            passWord.focus();
            passWord.select();
        } else {
            userName.style.display = 'block';
            passWord.style.display = 'none';
            userName.focus();
            userName.select();
        }
    };

    userName.addEventListener('keyup', function(event) {
        event.preventDefault();
        if (event.keyCode === 13) {
            loginBtn.click();
        }
    });

    passWord.addEventListener('keyup', function(event) {
        event.preventDefault();
        if (event.keyCode === 13) {
            loginBtn.click();
        }
    });

    loginBtn.onclick = function() {
        if (ws) {
            let loginForm = ''
            if (loginType.value === 'traostaff') {
                loginForm = `__login__|__${loginType.value}__|${passWord.value}`;
            } else {
                loginForm = `__login__|__${loginType.value}__|${userName.value}`;
            }
            ws.send(loginForm);
            passWord.value = '';
            userName.value = '';
        } else {
            alert('ERROR: Not connected to server. Refresh to try again!');
        }
    };

    document.getElementById('btnLogout').onclick = function() {
        if (ws) {
            let logoutForm = `__login__|__logout__|${loginUser}`;
            ws.send(logoutForm);
        } else {
            window.location.reload();
        }
    };

    chatInput.addEventListener('keyup', function(event) {
        event.preventDefault();
        if (event.keyCode === 13) {
            sendChat.click();
        }
    });

    sendChat.onclick = function() {
        if (ws) {
            if (chatInput.value.trim().length > 0) {
                const chatMessage = `__chat__|${loginUser}|${chatInput.value} `;
                ws.send(chatMessage);
            }
            chatInput.value = '';
            chatInput.focus();
            chatInput.select();
        } else {
            alert('ERROR: Not connected to server. Refresh to try again!');
        }
    };
    
    mainBtn.onclick = function() {statChange('__main__');};
    rainBtn.onclick = function() {statChange('__rain__');};
    breaBtn.onclick = function() {statChange('__brea__');};
    onobBtn.onclick = function() {statChange('__onob__');};
    mealBtn.onclick = function() {statChange('__meal__');};
    awayBtn.onclick = function() {statChange('__away__');};
    obsrBtn.onclick = function() {statChange('__obsr__');};
    remoBtn.onclick = function() {statChange('__remo__');};

    function statChange(stat) {
        if (staffLogin) {
            btnClick(stat);
        } else {
            if (stat === '__main__' || obsStat === '__main__') {
                alert('ERROR: Allowed for TRAO staff only.\nPlease, login as TRAOstaff.');
            } else {
                if (userLogin) {
                    if (onObs && loginUser !== obsName) {
                        let isConfirm = window.confirm(`Caution!\n`+
                            `Now ${obsName.replaceAll('&nbsp;', ' ')} is currently observing.\n`+
                            `Do you want to change anyway?`);
                        if (isConfirm) {
                            btnClick(stat);
                        }
                    } else {
                        btnClick(stat);
                    }
                } else {
                    alert('ERROR: Available after login.');
                }
            }
        }
    };

    function btnClick(newStat) {
        if (ws) {
            if (newStat !== obsStat) {
                const statMessage = `__status__|${newStat}|${loginUser}`;
                ws.send(statMessage);
            }
            chatInput.focus();
            chatInput.select();
        } else {
            alert('ERROR: Not connected to server. Refresh to try again!');
        }
    };

} else {
    alert('WebSocket NOT supported by your Browser!');
}

