function ConvertToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result); // Resolve the base64 string
        reader.onerror = (error) => reject(error); // Reject if there's an error
        reader.readAsDataURL(file); // Start reading the file as a base64 string
    });
}

function SetImageRef(imageRefId, data){
    const avatar = document.getElementById(imageRefId); 
    if (avatar) {
        const img = avatar.querySelector('img'); 
        if (img) {
            img.src = data; 
        } 
    }
}

function SetDownloadLink(downloadLinkId, data){
    const downloadLink = document.getElementById(downloadLinkId) as HTMLAnchorElement;
    downloadLink.href = data; // Set the Base64 image data as the href
    downloadLink.download = "downloaded_image.png"; // Set the file name
}