async function start () {
  try {
    const response = await fetch('http://127.0.0.1:8090/all')
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
    const response = await fetch('http://127.0.0.1:8090/all')
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

function updatePage (body) {
  console.log(JSON.parse(body))
  const queries = JSON.parse(body)
  order(queries)
  let content = ''
  for (let i = 0; i < queries.length; i++) {
    content +=
    `<div class="row" style="margin-bottom: 20px;">
        <div class="card bg-light" style="width: 100%;box-shadow: 10px 10px 10px lightgray;">
            <div class="card-body">
                <h5 class="card-title">${queries[i].number}</h5>
                <p class="card-text"><i>${queries[i].text}</i></p>
            </div>
        </div>
    </div>`
  }
  document.getElementById('content').innerHTML = content
}

function order (queries) {
  let keywords = [['money','mortgage'],['delete','login'],['question','request']]
  var priorities = []
  for (query of queries) {
    var priority = Number.MAX_SAFE_INTEGER
    for (word of query.text.split(' ')) {
      if (keywords[0].includes(word)) {
        priority -= 3
      } else if (keywords[1].includes(word) && priority > 2) {
        priority -= 2
      } else if (keywords[2].includes(word) && priority > 3) {
        priority -= 1
      }
    }
    priorities.push(priority)
  }
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
}

start()