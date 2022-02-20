var cachedOrder = []

async function refresh (done) {
  try {
    const response = await fetch('https://durhack-2022.herokuapp.com/all')
    if (!response.ok) {
      throw new Error('404')
    }
    const body = await response.text()
    updatePage(body,done)
  } catch (error) {
    alert(error)
  }
}

document.getElementById('inbox').addEventListener('click', async function (event) {
  refresh(false)
})

document.getElementById('archive').addEventListener('click', async function (event) {
  refresh(true)
})

async function updatePage (body,done) {
  var queries = JSON.parse(body)
  if (cachedOrder.length === 0) {
    // queries = await order(queries)
    for (let i = 0; i < queries.length; i++) {
      cachedOrder.push(queries[i].id)
    }
  } else {
    var temp = []
    for (let i = 0; i < queries.length; i++) {
      for (let j = 0; j < queries.length; j++) {
        if (cachedOrder[i] == queries[j].id) {
          temp.push(queries[j])
        }
      }
    }
    queries = temp
  }
  var content = ''
  for (let i = 0; i < queries.length; i++) {
    if (queries[i].done == done) {
      if (done == false) {
        content +=
        `<div class="row" style="margin-bottom: 20px;">
            <div class="card bg-light" style="width: 100%;box-shadow: 10px 10px 10px lightgray;">
                <div class="card-body">
                    <h5 class="card-title">${queries[i].phone}</h5>
                    <p class="card-text"><i>${queries[i].text}</i></p>
                    <button class="btn btn-outline-success" id="done${i}" type="submit">Done<p hidden>*${queries[i].id}*</p></button>
                </div>
            </div>
        </div>`
      } else {
        content +=
        `<div class="row" style="margin-bottom: 20px;">
            <div class="card bg-light" style="width: 100%;box-shadow: 10px 10px 10px lightgray;">
                <div class="card-body">
                    <h5 class="card-title">${queries[i].phone}</h5>
                    <p class="card-text"><i>${queries[i].text}</i></p>
                    <button class="btn btn-outline-success" id="done${i}" type="submit">Undo<p hidden>*${queries[i].id}*</p></button>
                </div>
            </div>
        </div>`
      }
    }
  }
  document.getElementById('content').innerHTML = content
  for (let i = 0; i < queries.length; i++) {
    if (queries[i].done == done) {
      document.getElementById(`done${i}`).addEventListener('click', async function (event) {
        try {
          let id = document.getElementById(`done${i}`).innerHTML.split('*')
          let response = await fetch('https://durhack-2022.herokuapp.com/done', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({'id': id[1], 'done': !done})
          })
          if (!response.ok) {
            throw new Error('404')
          }
          const body = await response.text()
          updatePage(body,done)
        } catch (error) {
          alert(error)
        }
      })
    }
  }
}

async function order (queries) {
  let keywords = [['missed','payment'],['delete','login'],['question','request']]
  var priorities = []
  for (query of queries) {
    var score = 0
    for (word of query.text.split(' ')) {
      if (keywords[0].includes(word.toLowerCase())) {
        score -= 0.5
      } else if (keywords[1].includes(word.toLowerCase()) && priority > 2) {
        score -= 0.25
      } else if (keywords[2].includes(word.toLowerCase()) && priority > 3) {
        score -= 0.1
      }
    }
    let sentiment = JSON.parse(await getSentiment(query.text)) // Array of json objects
    if (sentiment[0].classifications[0].tag_name == 'Negative') {
      score -= sentiment[0].classifications[0].confidence*2
    } else if (sentiment[0].classifications[0].tag_name == 'Neutral') {
      score += sentiment[0].classifications[0].confidence/2
    } else if (sentiment[0].classifications[0].tag_name == 'Positive') {
      score += sentiment[0].classifications[0].confidence
    }
    priorities.push(score)
  }
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

refresh(false)