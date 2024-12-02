function ConvertToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result); // Resolve the base64 string
        reader.onerror = (error) => reject(error); // Reject if there's an error
        reader.readAsDataURL(file); // Start reading the file as a base64 string
    });
}