
$(document).ready(function() {
    // Mengambil nilai awal dari API ketika halaman dimuat
    $.ajax({
        url: "https://api.countapi.xyz/get/namaincuy/counter",
        success: function(response) {
            $("#count").text(response.value);
        },
        error: function() {
            console.log("Gagal mengambil data dari API");
        }
    });
});


// Menambah nilai pada API ketika tombol diklik
function count() {
    $.ajax({
        url: "https://api.countapi.xyz/hit/namaincuy/counter",
        success: function(response) {
            $("#count").text(response.value);
        },
        error: function() {
            console.log("Gagal mengirim data ke API");
        }
    });
}