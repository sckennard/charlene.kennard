var form_helper = (function(){
  var page = document.querySelector('#p2a'),
      form = document.createElement('DIV'),
      fields,
      template = {
        title : 'Phone2Action Campaign',
        objName: 'p2a_campaign_object',
        styles : {
          div: 'max-width: 620px;margin:0 auto;display:block;padding: 30px;',
          error: 'color:red;font-size:14px;font-style:italic;display:none;',
          input: {
              text: 'box-shadow:none;display:block;margin:5px 0;min-width:calc(100% - 10px);height:14px;padding:8px;border:1px solid #999;-webkit-text-fill-color: inherit;-webkit-box-shadow: 0 0 0px #fff inset;',
              checkbox: 'display:block',
              submit: 'width:100px;height:30px;'
          },
          textarea: 'display:block;margin:20px 0;width:100%;min-height:200px;height:100%;pointer-events: none;border:1px solid #999;padding:8px;white-space:pre-wrap;',
          label: 'display:block;margin:0 0 16px 0;'
        },
        inputs : {  
           c4_optin_text:{  
              title: 'C4 Opt-In Text',
              type:'text',
              placeholder:'Yes, I want to stay in touch',
              error: 'c4_optin_text error_message',
              required: false
           },
           hero:{  
              title: 'Hero Image URL',
              format:/(?:http(s)?:\/\/)([/|.|\w|\s|-])*\.(?:jpg|jpeg|gif|png)/,
              type:'text',
              placeholder:'https://www.edf.org/sites/default/files/home_hero/100-days-home-hero-desktop-update.jpg',
              error: 'Invalid url. Should be a complete file path with file extension.',
              required: false
           },
           no_nav:{  
              title: 'Include Navigation (checked=include navigate)',
              type:'checkbox',
              placeholder:'[no_nav placeholder]',
              error: 'no_nav error_message',
              required: false
           },
           redirect:{  
              title: 'Redirect URL',
              format:/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/,
              type:'text',
              placeholder:'https://www.edf.org/action',
              error: 'Invalid url. Should be a complete file path.',
              required: false
           }
        }
      };
      
  
  var create_input = function(){
      var input;

      var headline = document.createElement('H1');
          headline.innerHTML = template.title;
          form.prepend(headline);

      for (var a in template.inputs){ 
          input = '<label for="'+ a 
            +'" style="'+ template.styles.label +'">'
            + template.inputs[a].title 
            + (template.inputs[a].required ?  ' (required)' : '')
            + '<input type="'
            + template.inputs[a].type 
            +'" name="' + a +'" id="'+ a 
            +'" placeholder="' + template.inputs[a].placeholder
            +'" style="'+ template.styles.input[template.inputs[a].type] +'"/>'
            +'<span class="err" style="'+ template.styles.error +'">Test</span>';
        
          form.innerHTML += input;
      }
      form.style.cssText = template.styles.div;
      form.innerHTML += '<input type="submit" value="SUBMIT" id="submit" style="'+ template.styles.input.submit +'"/>';
      form.innerHTML += '<textarea readonly class="code" style="'+ template.styles.textarea +'">...</textarea>';
      form.innerHTML += '<input type="submit" value="COPY CODE" id="copy" style="'+ template.styles.input.submit +'"/>';

      page.appendChild(form);
    
      return form.querySelectorAll('input[type=text]');
  }
  
  var highlite_err = function(field, inErr){ 
    if(inErr){
      var errorMsg = template.inputs[field.getAttribute('id')].error;

      field.style.borderColor = 'rgba(255,0,0,1)';
      field.style.borderWidth = '2px';

      if(errorMsg !== undefined){
          field.nextElementSibling.innerHTML = errorMsg;
          field.nextElementSibling.style.display = 'inline-block'
      }
    }else{
      field.style.borderColor = 'rgb(153,153,153, 1)';
      field.style.borderWidth = '1px';
      field.nextElementSibling.innerHTML = '';
      field.nextElementSibling.style.display = 'none'
    }
  }
  
  var check_format = function(field){ 
      return template.inputs[field.getAttribute('id')].format.test(field.value);
  }
  
  var validate = function(field_id){
      var _this = document.getElementById(field_id), 
          formError = false;
    
      if(_this.value !== ''){
          if(template.inputs[field_id].format !== undefined){
              if(check_format(_this)){ 
                  highlite_err(_this, false)
              }
              else{ 
                  highlite_err(_this, true);
                  formError = true;
              }
          }
      }else{
        if(template.inputs[field_id].required){
          // scream it's missing
          highlite_err(_this, true)
          formError = true;
        }else{
          highlite_err(_this, false)
        }
      }

      return formError;
  }

  var create_obj = function (){
      var obj = new Object();
      for (var a in template.inputs){ 
          if(template.inputs[a].type === 'text' && document.querySelector('#'+a).value !== ''){
              obj[a] = document.querySelector('#'+a).value;
          }
          if(template.inputs[a].type === 'checkbox' && document.querySelector('#'+a).checked){
              obj[a] = document.querySelector('#'+a).checked;
          }
      }
      form.querySelector('.code').innerHTML = 'var '+ template.objName +' = ' +  JSON.stringify(obj).replace(/"(\w+)"\s*:/g, '$1:').replace(/"/g, '\'') + ';' + '\n\n\n'
      + '!function(e,s,t){function a(e){var t="script",a=s.createElement(t),n=s.getElementsByTagName(t)[0];a.type="text/javascript",a.async=!1,a.src=e,n.parentNode.insertBefore(a,n)}var n="www",o=".min",c="",i=s.body;p2a_campaign_object.body_background=i.style.backgroundImage,s.body.style.opacity=0,s.body.style.background="white",0===t.pathname.indexOf("/embed/")&&(e.stopGA=!0),-1<t.search.indexOf("chums=testing")&&(e.isDev=!0,n="dv8",o="",c="?v="+(new Date).getTime());var d="https://"+n+".edf.org/";a(d+"js/e_tracking"+o+".js"+c),a(d+"assets/p2a/dist/js/p2a"+o+".js"+c)}(window,document,location);</script><script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script><script>';
      
  }
  
  var evt_input = function(){
    for (var i = 0, len = fields.length; i < len; i++) {
      fields[i].addEventListener('blur', function(e){
        validate(e.target.id, 'blur');
      }, false);
    }
  }
  
  var evt_submit = function(){
      form.querySelector('input#submit').addEventListener('click', function (e) {
        var formError = false;

        for(var n = 0; n < fields.length; n++){
          if(fields[n].value ===''){
              
              if(validate(fields[n].getAttribute('id'))){
                  formError = true;
                  return;
              }
          }
        }

        if(!formError){
          create_obj();
        }
      })
  }

  var evt_copy = function(){
      form.querySelector('input#copy').addEventListener('click', function (e) {
          var code = form.querySelector('textarea');
          code.select();
          document.execCommand("copy");
      })
  }
  
  var init = function(){
      fields = create_input(); 
      evt_input();
      evt_submit();
      evt_copy();
  }

  return {
    init: init
  };
})();


form_helper.init();