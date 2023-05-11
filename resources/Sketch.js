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

let imgUrl = "resources/sample.png";

// Menyimpan atribut gambar asli
let OriginalImg = new Img(imgUrl, 1500, 1000);

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

// Menyesuaikan posisi dan ukuran teks thumbnail
let textposx = ThumbnailDimension[0].width/2;
let textposy = ThumbnailDimension[0].height/2;
let textsize = (100*ThumbnailDimension[0].rescale);
let textsizeRescale = textsize/ThumbnailDimension[0].rescale;
console.log("textsize = "+textsize);
console.log("textsizeRescale = "+textsizeRescale);

function preload() {
  // Memuat gambar sebelum program dijalankan
  img = loadImage(imgUrl);
}
function setup() {
  img.resize(ThumbnailDimension[0].width, ThumbnailDimension[0].height);
  // Membuat canvas dengan ukuran yang sama dengan gambar
  const canvas = createCanvas(ThumbnailDimension[0].width, ThumbnailDimension[0].height);
  canvas.parent("thumbnail"); // Menempatkan elemen canvas ke dalam div dengan id "canvas-container"
}

function draw() {
  // Menampilkan gambar di atas canvas
  image(img, 0, 0);
  // Menambahkan teks ke canvas
  textSize(textsize); // Mengatur ukuran teks menjadi 64
  textFont('Helvetica'); // Mengatur jenis font menjadi Helvetica
  fill(255, 0, 0); // Mengatur warna teks menjadi merah
  textAlign(CENTER, CENTER); // Mengatur align teks menjadi center
  text('Adrian Sutansaty', textposx, textposy); // Menampilkan teks pada posisi tengah-tengah canvas
}

function download() {
  rescale();
  rescale();
  console.log("rescale() = "+textsize+" | reset() = "+(textsizeRescale));
  // Mengunduh canvas menjadi gambar PNG
  saveCanvas('testaja', 'png');
  reset();
}
function rescale(){
  resizeCanvas(OriginalImg.width, OriginalImg.height);
  img.resize(OriginalImg.width, OriginalImg.height);
  textposx = OriginalImg.width/2;
  textposy = OriginalImg.height/2;
  textsize = textsizeRescale;
}
function reset(){
  resizeCanvas(ThumbnailDimension[0].width, ThumbnailDimension[0].height);
  img.resize(ThumbnailDimension[0].width, ThumbnailDimension[0].height);
  textposx = ThumbnailDimension[0].width/2;
  textposy = ThumbnailDimension[0].height/2;
  textsize = textsizeRescale*ThumbnailDimension[0].rescale;
}   