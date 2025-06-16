 // 매출 슬라이드
 let roller = document.querySelector('.roller .rolling_list');
 roller.id = 'roller1';
 let clone = roller.cloneNode(true);
 clone.id = 'roller2';
 document.querySelector('.roller').appendChild(clone);
 roller.classList.add('original');
 clone.classList.add('clone');
 //창업 탭 기능
 function openTab(tabName) {
     document.querySelectorAll('.tab, .tabs').forEach(function (el) {
         el.classList.remove('on');
     });
     document.getElementById(tabName).classList.add('on');
     document.querySelector('.tabs[onclick="openTab(\'' + tabName + '\')"]').classList.add('on');
}
 
