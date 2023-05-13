class Img {
  constructor(url, width, height, textsize, textposx, textposy) {
    this._url = url;
    this._width = width;
    this._height = height;
    this._textsize = textsize;
    this._textposx = textposx;
    this._textposy = textposy;
  }
  get url() {
    return this._url;
  }
  get width() {
    return this._width;
  }
  get height() {
    return this._height;
  }
  set url(newUrl) {
    this._url = newUrl;
  }
  set width(newWidth) {
    this._width = newWidth;
  }
  set height(newHeight) {
    this._height = newHeight;
  }
}

// ------------------------------------------

// Mengambil cookie hasil dari API ImgBB
const cookie264 = [];
function getCookie264(){
  const divElement = document.querySelector('#thumbnail-container');
  const cookies = document.cookie.split(';');
  const imageUrl = document.cookie.match(/imageUrl264=([^;]+)/)[1];
  if(imageUrl==null){ window.location.href = "/"; }
  const width = document.cookie.match(/width264=([^;]+)/)[1];
  const height = document.cookie.match(/height264=([^;]+)/)[1];
  return { imageUrl, width, height };
}
cookie264.push(getCookie264());

// Menyimpan atribut gambar asli
let OriginalImg = new Img(cookie264[0].imageUrl, cookie264[0].width, cookie264[0].height);

// Menyesuaikan gambar thumbnail
const ThumbnailDimension = [];
function setThumbnailDimension(){
  const divElement = document.querySelector('#thumbnail-container');
  const width = divElement.offsetWidth;
  const rescale = width/OriginalImg.width;
  const height = OriginalImg.height*rescale;
  return { width, height, rescale };
}
ThumbnailDimension.push(setThumbnailDimension());

// Menyesuaikan font, posisi, dan ukuran teks thumbnail default
let textposx = ThumbnailDimension[0].width/2;
let textposy = ThumbnailDimension[0].height/2;
let textsize = 50;
let newTextsize = 10;
let textcolor = "#000";
let canvasFont = "Wix Madefor Display";
let textsizeRescale = textsize/ThumbnailDimension[0].rescale;

// Menginisialisasi beberapa DOM
const namaTextArea = document.getElementById('daftar-nama');
let namaArray = namaTextArea.value.split('\n');
let namaPreview = namaArray[0];

function preload() {
  // Memuat font dan gambar sebelum program dijalankan
  try {
    img = loadImage(OriginalImg.url);
  } catch (error) {
    window.location.href = "/"; 
  }
}
function setup() {
  img.resize(ThumbnailDimension[0].width, ThumbnailDimension[0].height);
  // Membuat canvas dengan ukuran yang sama dengan gambar
  const canvas = createCanvas(ThumbnailDimension[0].width, ThumbnailDimension[0].height);
  canvas.parent("thumbnail"); // Menempatkan elemen canvas ke dalam div dengan id "canvas-container"
  document.getElementById("thumbnail-loading").classList.add('d-none');
  document.getElementById("thumbnail").classList.remove('d-none');
}

function draw() {
  // Menampilkan gambar di atas canvas
  image(img, 0, 0);
  // Menambahkan teks ke canvas
  textSize(textsize); // Mengatur ukuran teks
  // textFont('Wix Madefor Display'); // Mengatur jenis font
  textFont(canvasFont); // Mengatur jenis font
  fill(textcolor); // Mengatur warna teks menjadi merah
  textAlign(CENTER, CENTER); // Mengatur align teks menjadi center
  text(namaPreview, textposx, textposy); // Menampilkan teks pada posisi tengah-tengah canvas
}

function download() {

  document.getElementById("btn-download").classList.add('btn-light', 'text-dark', 'border');
  document.getElementById("btn-download").disabled = true;
  
  document.getElementById("thumbnail").classList.add('d-none');
  document.getElementById("namain-loading").classList.remove('d-none');
  var namainCount = document.getElementById("namain-count");

  rescale();
  rescale();
  // Mengunduh canvas menjadi gambar 
  for (let i = 0; i < namaArray.length; i++) {
    setTimeout(() => {
      textChange(namaArray[i+1])
      saveCanvas((i+1)+". "+namaArray[i], 'png');
      namainCount.innerHTML = "("+(i+1)+"/"+(namaArray.length)+") : "+namaArray[i+1];
      if(i==namaArray.length-1){
        document.getElementById("namain-loading").classList.add('d-none');
        document.getElementById("namain-done").classList.remove('d-none');
      }
    }, i * 500);
  }
}
function rescale(){
  resizeCanvas(OriginalImg.width, OriginalImg.height);
  img.resize(OriginalImg.width, OriginalImg.height);
  textposx = OriginalImg.width*(sliderX.value/100);
  textposy = OriginalImg.height*(sliderY.value/100);
  textsize = textsizeRescale;
}
function reset(){
  document.getElementById("btn-download").classList.remove('btn-light', 'text-dark', 'border');
  document.getElementById("btn-download").disabled = false;
  document.getElementById("thumbnail").classList.remove('d-none');
  document.getElementById("namain-loading").classList.add('d-none');
  document.getElementById("namain-done").classList.add('d-none');
  resizeCanvas(ThumbnailDimension[0].width, ThumbnailDimension[0].height);
  img.resize(ThumbnailDimension[0].width, ThumbnailDimension[0].height);
  textposx = ThumbnailDimension[0].width*(sliderX.value/100);
  textposy = ThumbnailDimension[0].height*(sliderY.value/100);
  textsize = textsizeRescale*ThumbnailDimension[0].rescale;
  namaArray = namaTextArea.value.split('\n');
  textChange(namaArray[0]);
}
function textChange(nama){
  namaPreview = nama;
}

// ------------------------------------------------------------------------------

// Mengupdate preview & array daftar nama tiap kali ada perubahan
namaTextArea.addEventListener('change', () => {
  namaArray = namaTextArea.value.split('\n');
  textChange(namaArray[0]);
});

// Slider untuk posisi teks horizontal
const sliderX = document.getElementById('slider-x');
sliderX.addEventListener('input', () => {
  document.getElementById('slider-x-value').innerText = sliderX.value;
  textposx = ThumbnailDimension[0].width*(sliderX.value/100);
});

// Slider untuk posisi teks vertikal
const sliderY = document.getElementById('slider-y');
sliderY.addEventListener('input', () => {
  document.getElementById('slider-y-value').innerText = sliderY.value;
  textposy = ThumbnailDimension[0].height*(sliderY.value/100);
});

// Slider untuk ukuran teks
const sliderSize = document.getElementById('slider-size');
sliderSize.addEventListener('input', () => {
  document.getElementById('slider-size-value').innerText = sliderSize.value;
  textsize = parseInt(sliderSize.value);
});

// Color picker untuk warna teks
const colorPicker = document.getElementById('color-picker');
colorPicker.addEventListener('input', function() {
  textcolor = colorPicker.value;
});

// Ambil elemen slider
const slider = document.getElementById('slider-t-size');

// Tambahkan event listener pada perubahan nilai slider

function textResize(value){
  textsize = 10;
}
function textsizeCheck(){
  console.log("textsize = "+textsize);
}