export async function fetcher(url, options = { method: 'POST' }, shouldUseAuth = false) {
  try {
  
    let fetchOptions = {
      ...options,
       headers: { 'Content-Type': 'application/json' } 
      };

    if (shouldUseAuth) {
      const accessToken = localStorage.getItem('accessToken');
      fetchOptions = {
        ...fetchOptions,
        headers: {
          ...fetchOptions.headers,
          Authorization: `Bearer ${accessToken}`,
      },
    };
  }
    const response = await fetch(url, fetchOptions);

    const data = await response.json();
    return data;
  } catch (error) {
    console.alert('Error with api call', error);
  }
}