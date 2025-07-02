// FeedbackSurvey.js
// Custom feedback modal logic as a plain script (no module syntax)
(function() {
  var _surveys = [];
  var _openCount = 0;

  function _showModal(survey) {
    var s = document.createElement('style');
    s.textContent = ".fb-ov{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.5);display:flex;align-items:center;justify-content:center;z-index:9999}.fb-md{background:#fff;padding:20px;border-radius:8px;max-width:400px;width:100%;text-align:center;box-shadow:0 2px 10px rgba(0,0,0,.2);font-family:sans-serif}.fb-md h2{margin:0}.fb-str{margin:10px 0}.fb-s{font-size:24px;cursor:pointer;color:#ccc}.fb-s.sel{color:gold}.fb-md textarea{width:100%;height:60px;margin:10px 0;padding:5px}.fb-sub{background:#07f;color:#fff;border:none;padding:8px 16px;cursor:pointer;border-radius:4px}";
    document.head.appendChild(s);

    var o = document.createElement('div');
    o.className = 'fb-ov';
    o.innerHTML = '<div class="fb-md"><h2>' + survey.title + '</h2><p>' + survey.subtitle + '</p><div class="fb-str">' +
      [1,2,3,4,5].map(function(i){return '<span class="fb-s" data-s="'+i+'">&#9733;</span>'}).join('') +
      '</div><textarea placeholder="Your feedback..."></textarea><br/><button class="fb-sub">Submit</button></div>';
    document.body.appendChild(o);

    survey.modalOpen = true;
    _openCount++;

    var rating = 0;
    var stars = o.querySelectorAll('.fb-s');
    stars.forEach(function(st){
      st.addEventListener('click', function(){
        rating = parseInt(st.dataset.s);
        stars.forEach(function(s){ s.classList.toggle('sel', parseInt(s.dataset.s) <= rating); });
      });
    });

    o.querySelector('.fb-sub').addEventListener('click', function(){
      var txt = o.querySelector('textarea').value;
      console.log('Feedback:', { rating: rating, txt: txt });
      _closeModal(o, survey);
    });

    o.addEventListener('click', function(e){ if(e.target === o) _closeModal(o, survey); });
  }

  function _closeModal(o, survey) {
    document.body.removeChild(o);
    survey.modalOpen = false;
    _openCount--;
  }

  window.FeedbackSurvey = {
    create: function(options) {
      var survey = {
        title: options.title || 'Leave Feedback',
        subtitle: options.subtitle || 'How was your experience?',
        trigger: options.trigger, // optional: selector for auto-trigger
        modalOpen: false
      };
      _surveys.push(survey);
      if (survey.trigger) {
        document.addEventListener('click', function(e){
          if (e.target.closest(survey.trigger) && !_openCount) {
            _showModal(survey);
          }
        });
      }
      if (options.openNow) {
        _showModal(survey);
      }
    },
    getOpenCount: function() {
      return _openCount;
    }
  };
})(); 