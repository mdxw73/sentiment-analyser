async function start () {
  try {
    const response = await fetch('https://durhack-2022.herokuapp.com/all')
    if (!response.ok) {
      throw new Error('404')
    }
    const body = await response.text()
    updatePage(body)
  } catch (error) {
    alert(error)
  }
}

document.getElementById('refresh').addEventListener('click', async function (event) {
  try {
    const response = await fetch('https://durhack-2022.herokuapp.com/all')
    if (!response.ok) {
      throw new Error('404')
    }
    const body = await response.text()
    updatePage(body)
  } catch (error) {
    alert(error)
  }
})

// document.getElementById('edit').addEventListener('click', function (event) {
//   document.forms.form.parentNode.replaceChild(document.forms.form.cloneNode(true), document.forms.form)
//   document.forms.form.innerHTML =
//     `<input class="form-control me-2" type="search" placeholder="Title" aria-label="Search" id="text">
//     <button class="btn btn-outline-success" type="submit">Search</button>`
//   document.forms.form.action = 'http://127.0.0.1:8090/recipe/title'
//   document.forms.form.method = 'get'
//   document.forms.form.addEventListener('submit', async function (event) {
//     await makeRequest(event)
//   })
// })

// async function makeRequest (event) {
//   event.preventDefault()
//   try {
//     let response
//     if (event.target.method === 'post') {
//       response = await fetch(event.target.action, {
//         method: event.target.method,
//         body: new URLSearchParams(new FormData(event.target))
//       })
//     } else {
//       response = await fetch(event.target.action + '?search=' + document.getElementById('text').value)
//     }
//     if (!response.ok) {
//       throw new Error('404')
//     }
//     const body = await response.text()
//     updatePage(body)
//   } catch (error) {
//     alert(error)
//   }
// }

async function updatePage (body) {
  var queries = JSON.parse(body)
  queries = await order(queries)
  let content = ''
  for (let i = 0; i < queries.length; i++) {
    content +=
    `<div class="row" style="margin-bottom: 20px;">
        <div class="card bg-light" style="width: 100%;box-shadow: 10px 10px 10px lightgray;">
            <div class="card-body">
                <h5 class="card-title">${queries[i].phone}</h5>
                <p class="card-text"><i>${queries[i].text}</i></p>
            </div>
        </div>
    </div>`
  }
  document.getElementById('content').innerHTML = content
}

async function order (queries) {
  let keywords = [['money','mortgage'],['delete','login'],['question','request']]
  var priorities = []
  for (query of queries) {
    // var priority = Number.MAX_SAFE_INTEGER
    // for (word of query.text.split(' ')) {
    //   if (keywords[0].includes(word.toLowerCase())) {
    //     priority -= 3
    //   } else if (keywords[1].includes(word.toLowerCase()) && priority > 2) {
    //     priority -= 2
    //   } else if (keywords[2].includes(word.toLowerCase()) && priority > 3) {
    //     priority -= 1
    //   }
    // }
    var score = 0
    let sentiment = JSON.parse(await getSentiment(query.text)) // Array of json objects
    if (sentiment[0].classifications[0].tag_name == 'Positive') {
      score -= sentiment[0].classifications[0].confidence
    } else if (sentiment[0].classifications[0].tag_name == 'Neutral') {
      score += sentiment[0].classifications[0].confidence/2
    } else if (sentiment[0].classifications[0].tag_name == 'Neutral') {
      score += sentiment[0].classifications[0].confidence
    }
    let urgency = JSON.parse(await getUrgency(query.text))
    if (urgency[0].classifications[0].tag_name == 'Urgent') {
      score -= urgency[0].classifications[0].confidence
    } else if (urgency[0].classifications[0].tag_name == 'Not Urgent') {
      score += urgency[0].classifications[0].confidence
    }
    priorities.push(score)
  }
  console.log(priorities,queries)
  var highest = 0
  var swap = true
  while (swap == true) {
    swap = false
    for (let i = 0; i < priorities.length-1; i++) {
      if (priorities[i] > priorities[i+1]) {
        var temp = priorities[i]
        priorities[i] = priorities[i+1]
        priorities[i+1] = temp
        temp = queries[i]
        queries[i] = queries[i+1]
        queries[i+1] = temp
        swap = true
      }
    }
  }
  return queries
}

async function getSentiment (text) {
  try {
    response = await fetch('https://api.monkeylearn.com/v3/classifiers/cl_pi3C7JiL/classify/', {
      method: 'post',
      body: JSON.stringify({'data': [text]}),
      headers: {'Authorization': 'Token 94ea2fcc40e7a0ba7f57788297727208e9ab2ff6','Content-Type': 'application/json'}
    })
    if (!response.ok) {
      throw new Error('404')
    }
    const body = await response.text()
    return body
  } catch (error) {
    alert(error)
  }
}

async function getUrgency (text) {
  try {
    response = await fetch('https://api.monkeylearn.com/v3/classifiers/cl_Aiu8dfYF/classify/', {
      method: 'post',
      body: JSON.stringify({'data': [text]}),
      headers: {'Authorization': 'Token 94ea2fcc40e7a0ba7f57788297727208e9ab2ff6','Content-Type': 'application/json'}
    })
    if (!response.ok) {
      throw new Error('404')
    }
    const body = await response.text()
    return body
  } catch (error) {
    alert(error)
  }
}

start()