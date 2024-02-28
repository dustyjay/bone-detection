import awsS3, { albumBucketName } from "../utils/aws-setup";

export const fetchS3Bucket = async () => {
  return new Promise(function (resolve, reject) {
    awsS3.listObjects({ Delimiter: '/' }, function (err, data) {
      const albums = []
      if (err) {
        reject()
        return alert(
          'There was an error listing your albums: ' + err.message
        );
      } else {
        data.CommonPrefixes.forEach(function (commonPrefix) {
          var prefix = commonPrefix.Prefix;
          var albumName = decodeURIComponent(prefix.replace('/', ''));
          albums.push(albumName)
        });
      }
      resolve(albums)
    })
  })
}

const readYamlFile = async (fileUrl) => {
  return await fetch(fileUrl)
    .then(r => r.text())
    .then(text => {
      // [Actual file contents!]
      return text.split('\n').filter(Boolean).reduce((a, k) => {
        const [key, value] = k.split(': ')

        key.split('.').reduce((r, e, i, arr) => {
          return r[e] || (r[e] = (arr[i + 1] ? {} : value))
        }, a)

        return a;
      }, {})
    });
}

const getContentKey = (photoKey, directory) => {
  let key = 'images'
  if (photoKey.startsWith(`${directory}/thumbnails`)) {
    key = 'thumbnails'
  } else if (photoKey.startsWith(`${directory}/labels`)) {
    key = 'labels'
  }
  return key
}

// Show the photos that exist in an album.
export const fetchAlbumData = (albumName) => {
  const albumPhotosKey = encodeURIComponent(albumName) + '/';

  return new Promise((resolve, reject) => {
    awsS3.listObjects({ Prefix: albumPhotosKey }, async function (err, data) {
      if (err) {
        reject()
        return alert('There was an error viewing your album: ' + err.message);
      }
      // 'this' references the AWS.Request instance that represents the response
      const href = this.request.httpRequest.endpoint.href;
      const bucketUrl = href + albumBucketName + '/';

      const testPhotos = {
        images: [],
        thumbnails: [],
        labels: []
      }
      const trainPhotos = {
        images: [],
        thumbnails: [],
        labels: []
      }
      const valuePhotos = {
        images: [],
        thumbnails: [],
        labels: []
      }

      const testDirectory = `${albumName}/test`
      const trainDirectory = `${albumName}/train`
      const valueDirectory = `${albumName}/value`

      let yamlFileUrl = ''

      data.Contents.forEach(async (photo) => {
        var photoKey = photo.Key;
        var photoUrl = bucketUrl + encodeURIComponent(photoKey);
        if (photoUrl.endsWith('.yaml')) {
          yamlFileUrl = photoUrl
          return
        }
        if (!photoUrl.endsWith('.txt'))
          if (photoKey.startsWith(testDirectory)) {
            const key = getContentKey(photoKey, testDirectory)
            testPhotos[key].push({
              name: photoKey.replace(albumPhotosKey, ''),
              src: photoUrl
            })
          }
          else if (photoKey.startsWith(trainDirectory)) {
            const key = getContentKey(photoKey, trainDirectory)
            trainPhotos[key].push({
              name: photoKey.replace(albumPhotosKey, ''),
              src: photoUrl
            })
          }
          else if (photoKey.startsWith(valueDirectory)) {
            const key = getContentKey(photoKey, valueDirectory)
            valuePhotos[key].push({
              name: photoKey.replace(albumPhotosKey, ''),
              src: photoUrl
            })
          }
      });

      const regex = /'|\[|\]/gi
      const obj = await readYamlFile(yamlFileUrl)
      const filters = obj.names.replace(regex, '').split(', ')

      resolve({
        groups: [
          {
            name: 'All', total: testPhotos.images.length + valuePhotos.images.length + trainPhotos.images.length,
            images: [...testPhotos.images, ...valuePhotos.images, ...trainPhotos.images],
            thumbnails: [...testPhotos.thumbnails, ...valuePhotos.thumbnails, ...trainPhotos.thumbnails],
            labels: [...testPhotos.labels, ...valuePhotos.labels, ...trainPhotos.labels]
          },
          { ...testPhotos, name: 'Test', total: testPhotos.images.length },
          { ...valuePhotos, name: 'Value', total: valuePhotos.images.length },
          { ...trainPhotos, name: 'Train', total: trainPhotos.images.length }
        ], filters
      })
    });
  })
}

