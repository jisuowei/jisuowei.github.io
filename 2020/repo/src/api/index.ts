import axios from 'axios'

const prefix = process.env.REACT_APP_BASE_URL

export default {
  fetch: (key: string, data: any, setData: (data: any) => void) => {

    const keyMap: {[KEY: string]: string} = {
      'articles': '/api/get/post.php',
      'article': '/api/get/postDetail.php',
      'books': '/api/get/book.php',
      'bookNote': '/api/get/note.php',
      'stores': '/api/get/store.php',
      'apps': '/api/get/app.php',
      'ride': '/api/get/ride.php',
    }
    
    setTimeout(() => {
      if ( data ) {
        const params = new URLSearchParams();
        for ( const k in data ) {
          params.append(k, data[k]);
        }

        axios
          .post(
            `${prefix}${keyMap[key]}`,
            params,
            {
              headers: { 'content-type': 'application/x-www-form-urlencoded; charset=UTF-8' }
            }
          )
          .then( res => {
            setData(res.data)
          })
      } else {
        axios
          .post(`${prefix}${keyMap[key]}`)
          .then( res => {
            setData(res.data)
          })
      }
    }, 100);

  }
}