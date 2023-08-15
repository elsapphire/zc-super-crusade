$(function(){

	$.fn.formUploader = function (beforeCallback, progressCallback, successCallback, errorCallback) {
		var form = $(this);

		var beforeSubmit = function(){
			if (typeof(beforeCallback) == 'function'){
				return beforeCallback();
			}
			return true;
		};
		var onProgress = function(event, position, total, percent){
			if (typeof(progressCallback) == 'function'){
				progressCallback(position, total, percent);
			}
		};
		var onSuccess = function(response){
			form.trigger('reset')
			if (typeof(successCallback) == 'function'){
				successCallback(response);
			}
		};
		var onError = function(error){
			form.trigger('reset')
			if (typeof(errorCallback) == 'function'){
				errorCallback(error);
			}
		};

		var options = {
			beforeSubmit: beforeSubmit, // pre-submit callback
			uploadProgress: onProgress, //for progress report
			success: onSuccess, // post-submit callback
			error: onError,    //error callback
			resetForm: true    // reset the form after successful submit
		};
		form.attr('enctype', 'multipart/form-data');
		form.submit(function(e){
			e.preventDefault();
			$(this).ajaxSubmit(options);
		});
		this.submit = function(){
			form.submit();
		}

	};

	/*
	function FormUploader(form_id, beforeCallback, progressCallback, successCallback, errorCallback, resetForm){
		var form = $(form_id);
		if (resetForm == undefined) resetForm=true;

		var beforeSubmit = function(){
			if (typeof(beforeCallback) == 'function'){
				return beforeCallback();
			}
			return true;
		};
		var onProgress = function(event, position, total, percent){
			if (typeof(progressCallback) == 'function'){
				progressCallback(position, total, percent);
			}
		};
		var onSuccess = function(response){
			form.trigger('reset')
			if (typeof(successCallback) == 'function'){
				successCallback(response);
			}
		};
		var onError = function(error){
			form.trigger('reset')
			if (typeof(errorCallback) == 'function'){
				errorCallback(error);
			}
		};

		var options = {
			beforeSubmit: beforeSubmit, // pre-submit callback
			uploadProgress: onProgress, //for progress report
			success: onSuccess, // post-submit callback
			error: onError,    //error callback
			resetForm: resetForm       // reset the form after successful submit
		};
		form.submit(function(e){
			e.preventDefault();
			$(this).ajaxSubmit(options);
		});
		this.submit = function(){
			form.submit();
		}
	}
	*/
});