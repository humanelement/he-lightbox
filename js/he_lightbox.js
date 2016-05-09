var heLightbox=(function(){
  return{
      close:function(){
          var bodyEl=jQuery('body:first');
          var wrap=bodyEl.children('.he_lightbox_wrap.open:last');
          if(wrap.length>0){
                wrap.css('opacity','1');
                wrap.animate({
                    opacity:0,
                },300, function() {



                      wrap.removeClass('open').removeClass('loading');
                      wrap.find('.he_lightbox_body .lb_content .lb.loading').removeClass('loading');
                      var lb=wrap.find('.he_lightbox_body .lb_content .lb.open:first');
                      if(lb.length>0){
                        lb.removeClass('open');
                        if(lb[0]['clear_content_onclose']){
                            lb.remove();
                        }
                        if(lb[0]['clear_wrap_class_onclose']){
                            for(var c=0;c<lb[0]['clear_wrap_class_onclose'].length;c++){
                                wrap.removeClass(lb[0]['clear_wrap_class_onclose'][c]);
                            }
                        }
                      }
                    wrap.css('opacity','');

                    if(lb[0].hasOwnProperty('lightbox_onclose_callback')){
                      if(lb[0]['lightbox_onclose_callback']!=undefined){
                        lb[0]['lightbox_onclose_callback'](wrap, lb);
                      }
                    }
                });
          }
      },
      open:function(args){
          var retInit={}; var self=this;
          var getArg=function(ar,name,defaultVal){
              var ret;
              if(ar.hasOwnProperty(name)){ ret=ar[name]; }
              else{ ret=defaultVal; }
              return ret;
          };
          var id=getArg(args,'id');
          if(id!=undefined){
              var bodyEl=jQuery('body:first');
              var wrap=bodyEl.children('.he_lightbox_wrap:last');
              if(wrap.length<1){
                  bodyEl.append('<div class="he_lightbox_wrap"><div class="he_lightbox_body"></div></div>');
                  wrap=bodyEl.children('.he_lightbox_wrap:last');
                  var lbBody=wrap.children('.he_lightbox_body:first');
                  lbBody.append('<div class="lb_content"></div><div class="lb_btns"><div class="lbbtn_close"></div></div>');
                  var lbContent=lbBody.children('.lb_content:first');
                  var lbBtns=lbBody.children('.lb_btns:last');
                  var lbClose=lbBtns.children('.lbbtn_close:last');
                  lbContent.hover(function(){
                      jQuery(this).parents('.he_lightbox_wrap:first').addClass('over');
                  },function(){
                      jQuery(this).parents('.he_lightbox_wrap:first').removeClass('over');
                  });
                  lbContent.mouseleave(function(){
                      jQuery(this).parents('.he_lightbox_wrap:first').removeClass('over');
                  });
                  wrap.click(function(){
                    if(!jQuery(this).hasClass('over')){
                        self['close']();
                    }
                  });
                  lbClose.click(function(){
                      self['close']();
                  });
              }
              var loadOpenComplete=function(w,lb){
                lb.addClass('open'); w.addClass('open'); w.removeClass('loading');//open
                lb.removeClass('loading');
                //destroy content on close?
                lb[0]['clear_content_onclose']=getArg(args,'clear_content_onclose',false);
                //add class to wrap?
                var wrapClass=getArg(args,'wrap_class');
                if(wrapClass!=undefined){
                    for(var c=0;c<wrapClass.length;c++){
                        wrap.addClass(wrapClass[c]);
                    }
                    lb[0]['clear_wrap_class_onclose']=wrapClass;
                }
                w.css('opacity','0');
                w.animate({
                    opacity:1,
                },100, function() {
                    w.css('opacity','');
                    //callback on open event
                    var onopen=getArg(args,'onopen');
                    if(onopen!=undefined){
                        onopen(w,lb);
                    }
                    var onclose=getArg(args,'onclose');
                    if(onclose!=undefined){
                      lb[0]['lightbox_onclose_callback']=onclose;
                    }
                });
              };
              var lbContent=wrap.find('.he_lightbox_body .lb_content:first');
              var openLb=lbContent.children('.lb[data-id="'+id+'"]:first');
              if(openLb.length<1 || !openLb.hasClass('open')){
                lbContent.children('.lb.open').removeClass('.open');
                  var lb=lbContent.find('.lb[data-id="'+id+'"]:first');
                  if(lb.length<1){
                      lbContent.append('<div data-id="'+id+'" class="lb"></div>');
                      lb=lbContent.find('.lb[data-id="'+id+'"]:first');
                      var content=getArg(args,'content');
                      if(content!=undefined && content.length>0){
                          lb.append(content);
                          var loadElements=lb.find('iframe,img');
                          var numToLoad=loadElements.length;
                          if(numToLoad>0){
                              wrap.addClass('loading'); lb.addClass('loading'); lb.attr('data-remaining-load',numToLoad);
                              setTimeout(function(){
                                  var showTimeout=setTimeout(function(){
                                      loadOpenComplete(wrap, lb); //just show the content since the load took a long time already
                                  },6000);
                                  var doneFunc=function(){
                                      var numRemaining=parseInt(lb.attr('data-remaining-load'));
                                      numRemaining--;
                                      lb.attr('data-remaining-load',numRemaining);
                                      if(numRemaining<1){
                                          clearTimeout(showTimeout);
                                          setTimeout(function(){
                                            loadOpenComplete(wrap, lb);
                                          },300);
                                      }
                                  };
                                  loadElements.load(function(){
                                    doneFunc();
                                  });
                                  loadElements.error(function(){
                                    doneFunc();
                                  });
                              }, 100);
                          }else{
                              loadOpenComplete(wrap, lb);
                          }
                      }else{
                          loadOpenComplete(wrap, lb);
                      }
                  }else{
                      loadOpenComplete(wrap, lb);
                  }
              }
          }
          return retInit;
      }
  };
}());
