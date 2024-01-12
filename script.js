const inputEl = document.getElementById("input");

const infoText = document.getElementById("info-text");

const meaningContainerEl = document.getElementById("meaning-container")

const titleEl = document.getElementById("title");

const meaningEl = document.getElementById("meaning");

const audioEl = document.getElementById("audio");

async function fetchAPI(word)
{
  try
  {
    infoText.style.display = "block";

    infoText.innerHTML = `Searching the meaning of the word "${word}"`;

    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

    const result = await fetch(url);
    
    const finalResult = await result.json(result);

    console.log(finalResult[0]);

    if(finalResult.title)
    {
      meaningContainerEl.style.display = "block";

      infoText.style.display = "none";

      titleEl.innerText = word;

      meaningEl.innerText = "N/A";

      audioEl.style.display = "none";
    }
    else
    {
      infoText.style.display = "none";

      meaningContainerEl.style.display = "block";

      audioEl.style.display = "inline-flex"

      titleEl.innerText = finalResult[0].word;

      meaningEl.innerText = finalResult[0].meanings[0].definitions[0].definition;

      audioEl.src = finalResult[0].phonetics[0].audio;
    }

  }
  catch(error)
  {
    infoText.innerHTML = "An error happend, Try again later";
  }
}

inputEl.addEventListener("keyup",(event)=>
{
  if(event.target.value && event.key === "Enter"){
    fetchAPI(event.target.value);
  }
})