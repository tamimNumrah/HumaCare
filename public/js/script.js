//SideNav
 const sideNav= document.querySelector('.sidenav');
 M.Sidenav.init(sideNav, {});

 //Slider
 const slider=document.querySelector('.slider');
 M.Slider.init(slider, {
     indicators:false,
     height:500,
     transition: 500,
     interval: 6000
 });

 document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems, options);
  });

  // Or with jQuery

  $(document).ready(function(){
    $('select').formSelect();
  });