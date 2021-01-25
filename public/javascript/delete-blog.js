const deleteBlogFormHandler = async (event) => {
  event.preventDefault();

  const id = window.location.toString().split('/')[window.location.toString().split('/').length-1];

  const response = await fetch(`/api/blogs/${id}`, {
    method: 'DELETE'
  });

  console.log(response);
  if (response.ok) document.location.replace('/dashboard');
  else alert(response.statusText);
}

document.querySelector('.delete-blog-btn').addEventListener('click', deleteBlogFormHandler);