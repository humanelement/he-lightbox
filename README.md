# he-lightbox
A lightweight plugin to display a customizeable lightbox, containing content passed to the open function.

Written by Human Element's Milligan

See <a href="http://humanelement.github.io/he-lightbox/" target="_blank">DEMO</a>

Usage examples:
```Javascript
//Example 1
jQuery('.example1:first').click(function(e){

  e.preventDefault(); //prevent the default <a> click-to-follow href event

  heLightbox.open({
    id:'example1',
    content:'<h1>Example 1</h1><p>Very Simple Lightbox with minimal styling.</p><p>Just the basic functionality and styles are here.</p><p>Hey, where\'s the padding?</p>'
  });

});

//Example 2
jQuery('.example2:first').click(function(e){

  e.preventDefault(); //prevent the default <a> click-to-follow href event

  heLightbox.open({
    id:'example-2',
    content:'<h1>Example 2</h1><p>Use the wrap_class property to add your own classes to the lightbox</p><p>For example, this lightbox uses a "padding-class" selector to add more styles to this specific content.</p>',
    wrap_class:['padding-class'] //array of classes to add to the lightbox when this content is opened
  });

});

//Example 3
jQuery('.example3:first').click(function(e){

  e.preventDefault(); //prevent the default <a> click-to-follow href event

  heLightbox.open({
    id:'e3',
    content:'<iframe src="https://www.youtube.com/embed/J---aiyznGQ?autoplay=1" frameborder="0" allowfullscreen></iframe>',
    clear_content_onclose:true
  });

});

//Example 4
jQuery('.example4:first').click(function(e){

  e.preventDefault(); //prevent the default <a> click-to-follow href event

  heLightbox.open({
    id:'my-content-id',
    content:'<h1>Example 4</h1><p>You should see an alert() on OPEN and on CLOSE.</p>',
    wrap_class:['padding-class'],

    onopen:function(wrap, lb){
      alert('lightbox OPEN!');
    },
    onclose:function(wrap, lb){
      alert('lightbox CLOSE!');
    }
  });

});

```
