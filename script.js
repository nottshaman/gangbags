const uploadInput = document.getElementById("upload");
const preview = document.getElementById("preview");
const result = document.getElementById("result");
const applyBtn = document.getElementById("apply");
const downloadLink = document.getElementById("download");

let imageData = "";

uploadInput.addEventListener("change", () => {
  const file = uploadInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      preview.src = reader.result;
      imageData = reader.result;
    };
    reader.readAsDataURL(file);
  }
});

applyBtn.addEventListener("click", async () => {
  if (!imageData) {
    alert("Please upload an image first.");
    return;
  }

  applyBtn.textContent = "Applying...";
  try {
    const prompt = "Create a ghibli studio style cute image of a cool gangster with green and black color scheme. His eyes are glowing dollar bag symbols. The background is filled with dollar bags. Add text BAGS Cult in the backgound";
    const response = await fetch("https://gangbags1-backend-3.onrender.com/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer YOUR_OPENAI_API_KEY"
      },
      body: JSON.stringify({
        model: "dall-e-3",
        prompt: prompt,
        n: 1,
        size: "1024x1024"
      })
    });

    const data = await response.json();
    if (data && data.data && data.data[0].url) {
      result.src = data.data[0].url;
      downloadLink.href = data.data[0].url;
    } else {
      alert("Error generating image.");
    }
  } catch (err) {
    alert("Failed to call OpenAI API: " + err.message);
  } finally {
    applyBtn.textContent = "Apply Gang Bags Style";
  }
});
const fileInput = document.getElementById("imageInput");
const fileName = document.getElementById("fileName");

fileInput.addEventListener("change", () => {
  fileName.textContent = fileInput.files.length > 0
    ? fileInput.files[0].name
    : "No file chosen";
});

