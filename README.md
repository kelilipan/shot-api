# Screenshot API using express & pupetter

Yes, screenshot a website using API

example:

<pre><code>
http://localhost:3000/shot?url=<b>https://wisesa.dev</b>&width=<b>600</b>&height=<b>600</b>&encode=<b>true</b>
</code></pre>

parameters

- **url**: your url (required)
- **fullPage**: full page or not (default:false)
- **width**: image width
- **height**: image height
- **encode**: return image in base64 (default:false)
