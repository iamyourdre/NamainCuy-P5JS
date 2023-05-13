
$(document).ready(function() {
    if ($('#file-upload').val()) {
      // Jika #file-upload tidak kosong
      $('#file-upload').val('');
    }
  $('#file-upload').on('change', function() {
    if ($(this).val()) {
      $('#form-upload').submit(function(e) {
        var btn = document.getElementById("btn-upload");
        btn.disabled = true;
        btn.innerHTML = `<i class="fa-regular fa-snowflake spin"></I>&nbsp; Memproses`;
        e.preventDefault();
        var formData = new FormData(this);
        $.ajax({
          url: 'https://api.imgbb.com/1/upload?key=3680eab21d63c08092f518f36244053d&expiration=600',
          type: 'POST',
          data: formData,
          contentType: false,
          processData: false,
          success: function(response) {
            // Membuat cookie imgurl
            document.cookie = `imageUrl264=${response.data.url};max-age=` + 15 * 60 + ";SameSite=None;Secure";
            // Membuat cookie width
            document.cookie = `width264=${response.data.width};max-age=` + 15 * 60 + ";SameSite=None;Secure";
            // Membuat cookie height
            document.cookie = `height264=${response.data.height};max-age=` + 15 * 60 + ";SameSite=None;Secure";
            window.location.href = `canvas.html`;
          },
          error: function() {
            alert('Gagal mengupload gambar.');
            btn.disabled = false;
            btn.innerHTML = 'Upload';
          }
        });
      }).submit();
    }    
  });
});