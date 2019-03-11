var p2a_helper = (function(){
    var page = document.querySelector('#p2a'),
        form = document.createElement('DIV'),
        fields,
        template = {
          styles : {
            error: 'color:red;font-size:10px;font-style:italic;display:none;',
            input:'box-shadow:none;'
          },
          inputs : {  
             c4_optin_text:{  
                title: 'C4 Opt-In Text',
                format:'[FORMAT]',
                type:'text',
                placeholder:'[c4_optin_text placeholder]',
                error: 'c4_optin_text error_message',
                required: false
             },
             hero:{  
                title: 'Hero Image (url)',
                format:'/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/g',
                type:'text',
                placeholder:'[hero placeholder]',
                error: 'hero error_message',
                required: false
             },
             no_nav:{  
                title: 'Include Navigation (checked=include navigate)',
                format:'[FORMAT]',
                type:'checkbox',
                placeholder:'[no_nav placeholder]',
                error: 'no_nav error_message',
                required: false
             },
             redirect:{  
                title: 'Redirect URL',
                format:'/\b((http|https):\/\/?)[^\s()<>]+(?:\([\w\d]+\)|([^[:punct:]\s]|\/?))/g',
                type:'text',
                placeholder:'[redirect placeholder], helper',
                error: 'Invalid url',
                required: true
             }
          }
        }
        
    
    var create_input = function(){
        var input;

        for (var a in template.inputs){ 
            input = template.inputs[a].title 
              + '<br><input type="'
              + template.inputs[a].type 
              +'" name="'
              + a +'" id="'+ a +'" class="'+template.styles.input+'"/><br/>'
              +'<span class="err" style="'+template.styles.error+'">Test</span><br><br/>';
          
            form.innerHTML += input;
        }
        form.innerHTML += '<input type="submit" class="submit" value="SUBMIT" id="p2a_submit" />';
      
        page.appendChild(form);
      
        return form.querySelectorAll('input[type=text]');
    }
    
    var highlite_err = function(field, isErr){
      if(isErr){
        field.style.backgroundColor = "rgba(255,0,0,0.25)"
      }else{
        field.style.backgroundColor = "rgba(255,255,255,1)"
      }
    }
    
    var check_format = function(field){
      console.log('check format: ', field);
    }
    
    var validate = function(field_id, onwhat){
        var _this = document.getElementById(field_id);
      
        if(_this.value !== ''){
           // check format
           highlite_err(_this, false)

        }else{
          if(template.inputs[field_id].required){
             // scream it's missing
             highlite_err(_this, true)
          }
        }
    }
    
    var evt_input = function(){
      for (var i = 0, len = fields.length; i < len; i++) {
        fields[i].addEventListener('blur', function(e){
          validate(e.target.id, 'blur');
        }, false);
      }
    }
    
    var evt_submit = function(){
        form.querySelector('input[type=submit]').addEventListener('click', function (e) {
          for(var n = 0; n < fields.length; n++){
            if(fields[n].value ===''){
              validate(fields[n].getAttribute('id'), 'submit');

            }
          }
        })
    }
    
    var init = function(){
        fields = create_input(); 
        evt_input();
        evt_submit();
    }
  
    return {
      init: init
    };
})();

p2a_helper.init();