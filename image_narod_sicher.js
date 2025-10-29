const images1 = [
    { src: "tatar.jpg", caption: "Татары" },
    { src: "baskir.jpg", caption: "Башкиры" },
    { src: "russ.jpg", caption: "Русские" }
  ];
  
const images2 = [
    { src: "udmurt.jpg", caption: "Удмурты" },
	{ src: "mansy.jpg", caption: "Манси" },
    { src: "komi_people.jpg", caption: "Коми-Пермяки" },
    { src: "russ.jpg", caption: "Русские" }
  ];
  
const images3 = [
    { src: "russ.jpg", caption: "Русские" },
    { src: "komi_people.jpg", caption: "Коми-Пермяки" },
    { src: "tatar.jpg", caption: "Татары" },
  ];

  let currentIndex = 0;

  let imgElement = null;
  let captionElement = null;

  function updateImage() {
    imgElement.src = images1[currentIndex].src;
    captionElement.textContent = images1[currentIndex].caption;
  }

