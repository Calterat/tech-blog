const editBlogFormHandler = async (event) => {
  event.preventDefault();

  const id = window.location.toString().split('/')[window.location.toString().split('/').length-1];
  const title = document.querySelector('input[name="blog-title"]').value;
  const body = document.querySelector('textarea[name="blog-body"]').value;

  const response = await fetch(`/api/blogs/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      title,
      body
    }),
    headers: { 'Content-Type': 'application/json' }
  });

  if (response.ok) document.location.replace('/dashboard');
  else alert(response.statusText);
}

document.querySelector('.edit-blog-form').addEventListener('submit', editBlogFormHandler);