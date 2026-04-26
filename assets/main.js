(function () {
  var toastTimer;
  var toast = document.querySelector(".toast");
  var message = "Veo 4 generation is being prepared. Explore prompts, examples, and free access options below.";

  function showToast(text) {
    if (!toast) return;
    toast.textContent = text;
    toast.classList.add("is-visible");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () {
      toast.classList.remove("is-visible");
    }, 4200);
  }

  document.querySelectorAll(".js-generate-video").forEach(function (button) {
    button.addEventListener("click", function () {
      showToast(message);
    });
  });

  var promptInput = document.getElementById("videoPrompt");
  var promptCount = document.querySelector("[data-prompt-count]");
  if (promptInput && promptCount) {
    var updateCount = function () {
      promptCount.textContent = promptInput.value.length;
    };
    promptInput.addEventListener("input", updateCount);
    updateCount();
  }

  var referenceBlock = document.querySelector("[data-reference-block]");
  document.querySelectorAll(".mode-tab").forEach(function (tab) {
    tab.addEventListener("click", function () {
      document.querySelectorAll(".mode-tab").forEach(function (item) {
        item.classList.remove("is-active");
        item.setAttribute("aria-selected", "false");
      });
      tab.classList.add("is-active");
      tab.setAttribute("aria-selected", "true");
      if (referenceBlock) {
        referenceBlock.classList.toggle("is-hidden", tab.dataset.mode !== "image");
      }
    });
  });

  var generatePrompt = document.getElementById("generatePrompt");
  if (generatePrompt) {
    generatePrompt.addEventListener("click", function () {
      var subject = document.getElementById("subjectInput").value.trim() || "A cinematic subject";
      var motion = document.getElementById("motionInput").value.trim() || "moves with clear, intentional action";
      var camera = document.getElementById("cameraInput").value.trim() || "smooth tracking camera with a controlled push-in";
      var style = document.getElementById("styleSelect").value;
      var lighting = document.getElementById("lightingSelect").value;
      var output = document.getElementById("outputPrompt");
      var prompt = "Create a Google Veo 4 style AI video of " + subject + ". The subject " + motion + ". Use " + camera + ", " + lighting + ", and a " + style.toLowerCase() + " look. Keep subject identity stable, use clean cinematic composition, 8 seconds, 16:9, high-detail output, audio-ready with natural ambience, subtle music pacing, and no distracting artifacts.";
      output.value = prompt;
      showToast("Prompt generated locally. You can refine the subject, motion, camera, style, and lighting fields.");
    });
  }

  var copyPrompt = document.getElementById("copyPrompt");
  if (copyPrompt) {
    copyPrompt.addEventListener("click", function () {
      var output = document.getElementById("outputPrompt");
      if (!output || !output.value.trim()) {
        showToast("Generate a prompt first.");
        return;
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(output.value).then(function () {
          showToast("Prompt copied.");
        }).catch(function () {
          output.select();
          document.execCommand("copy");
          showToast("Prompt copied.");
        });
      } else {
        output.select();
        document.execCommand("copy");
        showToast("Prompt copied.");
      }
    });
  }
})();
