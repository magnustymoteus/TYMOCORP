let tlvl = document.querySelectorAll('#tlvl');
for(let i=0;i<tlvl.length;i++) {
    (tlvl[i].innerHTML<=5)?(tlvl[i].innerHTML="Adherent",tlvl[i].style.backgroundColor="green"):(tlvl[i].innerHTML<=8)?(tlvl[i].innerHTML="Suspicious",tlvl[i].style.backgroundColor="yellow",tlvl[i].style.color="black"):(tlvl[i].innerHTML<=9)?(tlvl[i].innerHTML="Wanted",tlvl[i].style.backgroundColor="red"):(tlvl[i].innerHTML="T.O.S",tlvl[i].style.backgroundColor="darkred");
}