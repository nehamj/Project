
const uploadContainer = document.getElementById("uploadContainer")
const dropContainer = document.getElementById("dropContainer")
const fileInput = document.getElementById("myFile")
const fileName = document.getElementById("fileName")

window.addEventListener("drop", onDragOver, false)
dropContainer.addEventListener("drop", onDrop, false)
dropContainer.addEventListener("dragover", onDragOver, false)
fileInput.addEventListener("change", handleFile)

document.getElementById("checkDiarize").addEventListener("click", checkDiarize)
document.getElementById("checkRecognize").addEventListener("click", checkRecognize)

var file_status=false


function onDrop(e) {
	e.preventDefault()
	
	handleFile(e, e.dataTransfer.files[0])
}

function onDragOver(e) {
	e.preventDefault()
	$('#uploadContainer').css("background-color", "#c6cacf")
	$('.drag-box').css("background-color", "#c6cacf")
	
}

function handleFile(e, file) {
    file_status=true
    var reqFile = file || e.target.files[0]
    console.log("File", reqFile)

    fileName.innerHTML = reqFile.name

    const data = new FormData()
    data.append("file", reqFile)

    axios({
        method: 'post',
        url: 'http://localhost:8080/send-file',
        data: data,
        headers:{
            'Content-Type':`multipart/form-data; boundary=${data._boundary}`
        },
        /*onUploadProgress: (p) => {
            var progressPercent = p.loaded / p.total
            //do whatever you want with this percentage
        }*/
    })
    .then(function(response) {
        fileName.innerHTML = 'file uploaded'
        console.log(response)
    })
    .catch(function(err) {
        console.log(err)
    })
}

function checkDiarize(e){
    e.preventDefault()
	if(file_status)
		location.href = 'diarize.html'
	else
		alert("No audio file uploaded")
}

function checkRecognize(e){
    e.preventDefault()
	if(file_status)
		location.href = 'recognize.html'
	else
		alert("No audio file uploaded")
}

$( document ).ready(function() {
    file_status=false
});
