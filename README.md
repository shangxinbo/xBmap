# xUpload
A simplest uploader for jQuery.support html5 and iframe method.

[《中文说明》](https://github.com/ShangXinbo/xUpload/blob/master/README_CN.md)

## intro
* require jQuery 1.4+, it's a jQuery plugin
* contain html5 function named __htmlUpload__  and iframe function named __iframeUpload__
* grace compatible: modern browsers use htmlUpload and other like ie6~ie9 use iframeUpload.
* highly customizable
* light,all lib within  6k -

## previous read


## options
name     | value       | description
-----------|----------------|----
name     | String       | the key name in formdata to send to server 
accept    | String(MIME type)  | the type of file you can select 
url      | String       | the URL of upload commit 
maxSize   | Number       | maxSize limit you choose file,only supported in modern browsers
data     | Object       | other params eccept the file when form commit
onSelect  |  Function      | trigger when selected file
onSuccess  | Function      | trigger when upload success  
onError   | Function      | trigger when upload fail. 

## example
<pre>
$('#upload').xUpload({
	url : 'http://www.geotmt.com/upload',
    name : 'file',
    accept: 'application/vnd.ms-excel',
    onSelect : function(data){
    	console.log(data);
    }
})
</pre>

## License
[GPL](https://github.com/ShangXinbo/xUpload/blob/master/LICENSE)
