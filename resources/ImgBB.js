
$(document).ready(function() {
    $('#form-upload').submit(function(e) {
      var btn = document.getElementById("btn-upload");
      btn.disabled = true;
      btn.innerHTML = ` <div class="spinner-border spinner-border-sm" role="status">
                          <span class="visually-hidden">Loading...</span>
                        </div>&nbsp; Memproses`;
      e.preventDefault();
      var formData = new FormData(this);
      $.ajax({
        url: 'https://api.imgbb.com/1/upload?key=3680eab21d63c08092f518f36244053d&expiration=900',
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
      });
    });