var timeInterval = 0;
var bgfs = document.getElementById('bg-fs');
var fa = document.getElementById('fake-auth');
var ag = document.getElementById('authorized-gif');
var xhr = new XMLHttpRequest();
const getip = () => {
    return new Promise((res, rej) => {fetch('https://api.ipify.org/?format=json')
    .then(res => res.json())
    .then(ip => res(ip.ip));});
}
const displayIntro = () => {
    return new Promise((res, rej) => {
        bgfs.classList.remove('bg-success');
        fa.style.display = "none";
        ag.style.display = "none";
        document.getElementById('video').style.visibility = "visible";
        setTimeout(() => document.getElementById('video').insertAdjacentHTML('beforeend', '<video muted autoplay class="fullscreen-bg__video" id="intro-video"> <source src="/images/tymocorp.mp4" type="video/mp4"></video>'), 2000);
    });
}
const fake_auth = () => {
    return new Promise((res, rej) => {
    const add_fatxt = (ms=0, str) => setTimeout(() => fa.innerText=str,timeInterval+=ms);
    const authorize = (ms=0) => {
        return new Promise((authRes, rej) => {
            setTimeout(() => {
                bgfs.classList.remove('bg-danger');
                bgfs.classList.add('bg-success');
                fa.classList.remove('loading-anim');
                ag.insertAdjacentHTML('beforeend', `<lottie-player src="https://assets1.lottiefiles.com/packages/lf20_7CP0ki.json"  background="transparent"  speed="2"  style="width: 75px; height: 75px;margin-left:30px;margin-bottom:10px" id="authorized" autoplay></lottie-player>`);
                authRes(1);
            }, timeInterval+=ms);    
            });
    }
    getip().then((ip) => {
        document.getElementById('auth-form').style.display = "none";
        document.getElementById('auth-div').classList.remove('row');
        add_fatxt(1, `PERFORMING AUTHENTICATOR VERIFICATION ON SUBJECT WITH I.P ${ip}`);
        add_fatxt(3e3, `ECHELON AND AUTHENTICATOR INSPECTION SUCCESSFUL`);
        add_fatxt(2e3, `SUBJECT AUTHORIZED`);
        authorize().then(() => res(1));});
    });
}
document.getElementById('submit-btn').onclick = (e) => {
    if(document.getElementById('key').value.length) {
    e.preventDefault();
    fake_auth().then(() =>  setTimeout(() => {
    displayIntro();
    setTimeout(() => {
       fetch("/AUTH/SUBMIT", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                "key": document.getElementById('key').value
            })
       }).then(() => window.location.href='../HOME');
    },11000);
}, 3500));}}


