const addBlogFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('input[name="blog-title"]').value;
  const body = document.querySelector('textarea[name="blog-body"]').value;

  const response = await fetch('/api/blogs', {
    method: 'POST',
    body: JSON.stringify({
      title,
      body
    }),
    headers: { 'Content-Type': 'application/json' }
  });

  if (response.ok) document.location.reload();
  else alert(response.statusText);
}

document.querySelector('.new-blog-form').addEventListener('submit', addBlogFormHandler);