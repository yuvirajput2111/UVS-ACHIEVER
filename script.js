const jobs = [
  {
    id: "job-1",
    title: "Frontend Engineer",
    company: "Astra Forge",
    location: "Remote, India",
    mode: "Remote",
    salary: "$95k - $125k",
    category: "Engineering",
    experience: "Mid",
    skills: ["react", "typescript", "ui systems", "performance"],
    hot: true,
    isNew: true,
    description: "Own polished user-facing product surfaces with high standards for speed and detail."
  },
  {
    id: "job-2",
    title: "AI Operations Lead",
    company: "Northline AI",
    location: "Bengaluru",
    mode: "Hybrid",
    salary: "$120k - $160k",
    category: "AI Operations",
    experience: "Lead",
    skills: ["llm ops", "prompt design", "evaluation", "analytics"],
    hot: true,
    isNew: false,
    description: "Build reliable review loops, operating metrics, and model delivery systems."
  },
  {
    id: "job-3",
    title: "Recruiting Strategist",
    company: "Vanta District",
    location: "Mumbai",
    mode: "On-site",
    salary: "$80k - $110k",
    category: "Recruiting",
    experience: "Senior",
    skills: ["hiring", "stakeholder management", "pipeline design", "screening"],
    hot: false,
    isNew: true,
    description: "Create a leaner hiring system that attracts stronger candidates and filters noise early."
  },
  {
    id: "job-4",
    title: "Product Designer",
    company: "Luma Stack",
    location: "Remote, Europe",
    mode: "Remote",
    salary: "$88k - $118k",
    category: "Design",
    experience: "Senior",
    skills: ["figma", "design systems", "ux research", "prototyping"],
    hot: true,
    isNew: false,
    description: "Lead interface clarity across the product and tighten the full user journey."
  },
  {
    id: "job-5",
    title: "Growth Marketing Manager",
    company: "Pulse Grid",
    location: "Delhi",
    mode: "Hybrid",
    salary: "$70k - $96k",
    category: "Marketing",
    experience: "Mid",
    skills: ["growth", "seo", "analytics", "content strategy"],
    hot: false,
    isNew: true,
    description: "Drive acquisition with disciplined experiments, real numbers, and cleaner positioning."
  },
  {
    id: "job-6",
    title: "Backend Engineer",
    company: "Cinder Cloud",
    location: "Remote, APAC",
    mode: "Remote",
    salary: "$110k - $145k",
    category: "Engineering",
    experience: "Senior",
    skills: ["node", "apis", "postgres", "cloud"],
    hot: true,
    isNew: false,
    description: "Ship resilient backend systems that support product growth without operational drag."
  },
  {
    id: "job-7",
    title: "Talent Operations Analyst",
    company: "Helio Works",
    location: "Pune",
    mode: "Hybrid",
    salary: "$62k - $82k",
    category: "Recruiting",
    experience: "Entry",
    skills: ["reporting", "ats", "coordination", "analytics"],
    hot: false,
    isNew: true,
    description: "Measure hiring velocity, clean up workflows, and keep recruiting operations sharp."
  },
  {
    id: "job-8",
    title: "ML Prompt Designer",
    company: "Signal Harbor",
    location: "Remote, Global",
    mode: "Remote",
    salary: "$105k - $135k",
    category: "AI Operations",
    experience: "Mid",
    skills: ["prompt design", "testing", "evaluation", "documentation"],
    hot: true,
    isNew: true,
    description: "Design prompt frameworks, evaluation rubrics, and playbooks that improve output quality."
  }
];

const state = {
  activeTab: "home",
  selectedCategory: "",
  savedJobIds: new Set(),
  ownerUnlocked: false,
  currentUser: null,
  freeApplicationsRemaining: 100,
  aiMatchFilters: {
    role: "",
    experience: "",
    mode: "",
    skills: ""
  },
  resumeScanText: "",
  companyRequests: [],
  emailAlerts: []
};

const categoryMeta = {
  Engineering: { iconClass: "purple", description: "Frontend, backend, systems" },
  "AI Operations": { iconClass: "coral", description: "Prompting, evals, model ops" },
  Design: { iconClass: "blue", description: "Product, UX, design systems" },
  Recruiting: { iconClass: "green", description: "Hiring strategy, talent ops" },
  Marketing: { iconClass: "purple", description: "Growth, brand, analytics" }
};

const tabs = Array.from(document.querySelectorAll("[data-tab]"));
const tabPanels = Array.from(document.querySelectorAll(".tab-panel"));
const authScreen = document.getElementById("auth-screen");
const loginForm = document.getElementById("login-form");
const signupForm = document.getElementById("signup-form");
const showLoginButton = document.getElementById("show-login");
const showSignupButton = document.getElementById("show-signup");
const loginEmailInput = document.getElementById("login-email");
const loginPasswordInput = document.getElementById("login-password");
const signupNameInput = document.getElementById("signup-name");
const signupEmailInput = document.getElementById("signup-email");
const signupPasswordInput = document.getElementById("signup-password");
const authStatus = document.getElementById("auth-status");
const authUserButton = document.getElementById("auth-user-button");
const homeCategories = document.getElementById("home-categories");
const homeFeaturedJobs = document.getElementById("home-featured-jobs");
const jobCategoryFilters = document.getElementById("job-category-filters");
const jobsList = document.getElementById("jobs-list");
const jobsEmpty = document.getElementById("jobs-empty");
const jobsResultSummary = document.getElementById("jobs-result-summary");
const jobsApplicationStatus = document.getElementById("jobs-application-status");
const savedJobsList = document.getElementById("saved-jobs-list");
const savedEmpty = document.getElementById("saved-empty");
const aiResults = document.getElementById("ai-results");
const aiEmpty = document.getElementById("ai-empty");
const aiResultSummary = document.getElementById("ai-result-summary");
const scannerForm = document.getElementById("scanner-form");
const resumeTextInput = document.getElementById("resume-text");
const scannerResultSummary = document.getElementById("scanner-result-summary");
const scannerResults = document.getElementById("scanner-results");
const scannerEmpty = document.getElementById("scanner-empty");
const scannerHighlight = document.getElementById("scanner-highlight");
const scannerHighlightCard = document.getElementById("scanner-highlight-card");
const offerRemaining = document.getElementById("offer-remaining");
const ownerGate = document.getElementById("owner-gate");
const ownerPanel = document.getElementById("owner-panel");
const ownerCodeInput = document.getElementById("owner-code");
const ownerUnlockButton = document.getElementById("owner-unlock");
const ownerStatus = document.getElementById("owner-status");
const ownerJobForm = document.getElementById("owner-job-form");
const ownerFormStatus = document.getElementById("owner-form-status");
const ownerTitleInput = document.getElementById("owner-title");
const ownerCompanyInput = document.getElementById("owner-company-name");
const ownerLocationInput = document.getElementById("owner-location");
const ownerSalaryInput = document.getElementById("owner-salary");
const ownerCategoryInput = document.getElementById("owner-category");
const ownerExperienceInput = document.getElementById("owner-experience");
const ownerModeInput = document.getElementById("owner-mode");
const ownerSkillsInput = document.getElementById("owner-skills");
const ownerDescriptionInput = document.getElementById("owner-description");
const ownerHotInput = document.getElementById("owner-hot");
const ownerNewInput = document.getElementById("owner-new");
const companyJobForm = document.getElementById("company-job-form");
const companyNameInput = document.getElementById("company-name");
const companyContactPersonInput = document.getElementById("company-contact-person");
const companyEmailInput = document.getElementById("company-email");
const companyJobTitleInput = document.getElementById("company-job-title");
const companyJobModeInput = document.getElementById("company-job-mode");
const companyJobSalaryInput = document.getElementById("company-job-salary");
const companyJobDetailsInput = document.getElementById("company-job-details");
const companyFormStatus = document.getElementById("company-form-status");
const companyRequestList = document.getElementById("company-request-list");
const companyRequestEmpty = document.getElementById("company-request-empty");
const emailAlertForm = document.getElementById("email-alert-form");
const alertEmailInput = document.getElementById("alert-email");
const alertCategoryInput = document.getElementById("alert-category");
const emailAlertStatus = document.getElementById("email-alert-status");
const emailAlertList = document.getElementById("email-alert-list");
const emailAlertEmpty = document.getElementById("email-alert-empty");
const jobSearchInput = document.getElementById("job-search");
const modeFilterInput = document.getElementById("mode-filter");
const experienceFilterInput = document.getElementById("experience-filter");
const matchForm = document.getElementById("match-form");
const matchRoleInput = document.getElementById("match-role");
const matchExperienceInput = document.getElementById("match-experience");
const matchModeInput = document.getElementById("match-mode");
const matchSkillsInput = document.getElementById("match-skills");

const categories = Object.keys(categoryMeta);
const OWNER_CODE = "UVSOWNER2026";

function setStats() {
  const uniqueCompanies = new Set(jobs.map((job) => job.company));
  document.getElementById("stat-total-jobs").textContent = String(jobs.length);
  document.getElementById("stat-hot-jobs").textContent = String(jobs.filter((job) => job.hot).length);
  document.getElementById("stat-companies").textContent = String(uniqueCompanies.size);
  document.getElementById("stat-new-jobs").textContent = String(jobs.filter((job) => job.isNew).length);
}

function switchTab(tabName) {
  state.activeTab = tabName;

  tabs.forEach((tab) => {
    const active = tab.dataset.tab === tabName;
    tab.classList.toggle("active", active);
    tab.setAttribute("aria-pressed", String(active));
  });

  tabPanels.forEach((panel) => {
    const active = panel.id === `panel-${tabName}`;
    panel.classList.toggle("active", active);
    panel.hidden = !active;
  });
}

function createCategoryButton(category, active = false) {
  const meta = categoryMeta[category];
  return `
    <button class="category-card ${active ? "active" : ""}" type="button" data-category="${category}">
      <div class="stat-icon ${meta.iconClass}"><span class="icon icon-spark"></span></div>
      <strong>${category}</strong>
      <p class="muted">${meta.description}</p>
    </button>
  `;
}

function createChip(category, active = false) {
  return `
    <button class="chip ${active ? "active" : ""}" type="button" data-category-filter="${category}">
      ${category}
    </button>
  `;
}

function createJobCard(job, context = "jobs") {
  const isSaved = state.savedJobIds.has(job.id);
  const applyLabel = state.freeApplicationsRemaining > 0 ? "Apply free" : "Apply Rs 199";
  const tags = [job.mode, job.experience, job.category];
  if (job.hot) {
    tags.push("Hot");
  }
  if (job.isNew) {
    tags.push("New");
  }

  return `
    <article class="job-card">
      <div class="job-card-top">
        <div>
          <h3>${job.title}</h3>
          <p class="job-company">${job.company} | ${job.location}</p>
        </div>
        <button
          class="save-button ${isSaved ? "saved" : ""}"
          type="button"
          data-save-job="${job.id}"
          aria-label="${isSaved ? "Remove saved job" : "Save job"}"
          aria-pressed="${isSaved}"
        >
          <span class="icon icon-bookmark"></span>
        </button>
      </div>
      <p class="job-description">${job.description}</p>
      <div class="job-meta">
        ${tags.map((tag) => `<span>${tag}</span>`).join("")}
      </div>
      <div class="job-card-footer">
        <span class="job-salary">${job.salary}</span>
        <button class="text-button" type="button" data-apply-job="${job.id}">
          ${applyLabel}
        </button>
      </div>
    </article>
  `;
}

function tokenizeSkills(value) {
  return value
    .split(",")
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean);
}

function rankJobs(filters) {
  const requestedSkills = tokenizeSkills(filters.skills);

  return jobs
    .map((job) => {
      let score = 25;
      const reasons = [];

      if (filters.role) {
        if (job.category === filters.role) {
          score += 28;
          reasons.push("role alignment");
        } else {
          score -= 8;
        }
      }

      if (filters.experience) {
        if (job.experience === filters.experience) {
          score += 20;
          reasons.push("level fit");
        } else {
          score -= 6;
        }
      }

      if (filters.mode) {
        if (job.mode === filters.mode) {
          score += 16;
          reasons.push("work mode match");
        } else {
          score -= 4;
        }
      }

      if (requestedSkills.length > 0) {
        const matchingSkills = requestedSkills.filter((skill) => job.skills.includes(skill));
        if (matchingSkills.length > 0) {
          score += matchingSkills.length * 12;
          reasons.push(`${matchingSkills.length} skill match${matchingSkills.length > 1 ? "es" : ""}`);
        }
      }

      if (job.hot) {
        score += 6;
      }

      if (job.isNew) {
        score += 4;
      }

      return {
        ...job,
        score: Math.max(0, Math.min(99, score)),
        explanation: reasons.length > 0 ? reasons.join(" | ") : "broad market fit"
      };
    })
    .filter((job) => job.score >= 30)
    .sort((left, right) => right.score - left.score);
}

function createMatchCard(job) {
  const isSaved = state.savedJobIds.has(job.id);
  const applyLabel = state.freeApplicationsRemaining > 0 ? "Apply free" : "Apply Rs 199";

  return `
    <article class="match-card">
      <div class="job-card-top">
        <div>
          <h3>${job.title}</h3>
          <p class="job-company">${job.company} | ${job.location}</p>
        </div>
        <span class="match-score">${job.score}% match</span>
      </div>
      <p class="match-explainer">Why it surfaced: ${job.explanation}.</p>
      <div class="match-tags">
        <span>${job.category}</span>
        <span>${job.mode}</span>
        <span>${job.experience}</span>
      </div>
      <div class="match-card-footer">
        <span class="job-salary">${job.salary}</span>
        <button class="text-button" type="button" data-apply-job="${job.id}">
          ${applyLabel}
        </button>
      </div>
    </article>
  `;
}

function createCompanyRequestCard(request) {
  return `
    <article class="request-card">
      <h3>${request.jobTitle}</h3>
      <p class="job-company">${request.companyName} | ${request.contactPerson}</p>
      <p class="match-explainer">${request.email} | ${request.mode} | ${request.salary}</p>
      <p class="job-description">${request.details}</p>
    </article>
  `;
}

function createEmailAlertCard(alert) {
  return `
    <article class="request-card">
      <h3>${alert.email}</h3>
      <p class="job-company">Alert category | ${alert.category}</p>
      <p class="match-explainer">${alert.message}</p>
    </article>
  `;
}

function scanResumeText(text) {
  const normalizedText = text.toLowerCase();

  return jobs
    .map((job) => {
      let score = 12;
      const matchedTerms = [];

      if (normalizedText.includes(job.category.toLowerCase())) {
        score += 18;
        matchedTerms.push(job.category);
      }

      if (normalizedText.includes(job.experience.toLowerCase())) {
        score += 10;
        matchedTerms.push(`${job.experience} level`);
      }

      if (normalizedText.includes(job.mode.toLowerCase())) {
        score += 6;
      }

      job.skills.forEach((skill) => {
        if (normalizedText.includes(skill)) {
          score += 11;
          matchedTerms.push(skill);
        }
      });

      const titleTerms = job.title.toLowerCase().split(" ");
      titleTerms.forEach((term) => {
        if (term.length > 3 && normalizedText.includes(term)) {
          score += 4;
        }
      });

      return {
        ...job,
        score: Math.max(0, Math.min(99, score)),
        explanation:
          matchedTerms.length > 0
            ? `matched on ${matchedTerms.slice(0, 4).join(", ")}`
            : "resume has limited overlap with this role"
      };
    })
    .filter((job) => job.score >= 25)
    .sort((left, right) => right.score - left.score);
}

function createScannerHighlight(job) {
  return `
    <p class="muted">Perfect match score</p>
    <strong>${job.title}</strong>
    <p class="job-company">${job.company} | ${job.location}</p>
    <p class="match-explainer">${job.score}% match. ${job.explanation}.</p>
  `;
}

function renderHome() {
  homeCategories.innerHTML = categories.map((category) => createCategoryButton(category)).join("");
  homeFeaturedJobs.innerHTML = jobs
    .filter((job) => job.hot || job.isNew)
    .slice(0, 3)
    .map((job) => createJobCard(job, "featured"))
    .join("");
}

function getFilteredJobs() {
  const searchValue = jobSearchInput.value.trim().toLowerCase();

  return jobs.filter((job) => {
    const matchesSearch =
      searchValue === "" ||
      job.title.toLowerCase().includes(searchValue) ||
      job.company.toLowerCase().includes(searchValue) ||
      job.skills.some((skill) => skill.includes(searchValue));

    const matchesMode = modeFilterInput.value === "" || job.mode === modeFilterInput.value;
    const matchesExperience =
      experienceFilterInput.value === "" || job.experience === experienceFilterInput.value;
    const matchesCategory = state.selectedCategory === "" || job.category === state.selectedCategory;

    return matchesSearch && matchesMode && matchesExperience && matchesCategory;
  });
}

function renderJobs() {
  const filteredJobs = getFilteredJobs();
  jobsResultSummary.textContent = `${filteredJobs.length} role${filteredJobs.length === 1 ? "" : "s"} available now`;
  jobsEmpty.hidden = filteredJobs.length !== 0;
  jobsList.innerHTML = filteredJobs.map((job) => createJobCard(job)).join("");

  if (filteredJobs.length === 0) {
    jobsList.innerHTML = "";
  }

  jobCategoryFilters.innerHTML = [
    `<button class="chip ${state.selectedCategory === "" ? "active" : ""}" type="button" data-category-filter="">All</button>`,
    ...categories.map((category) => createChip(category, state.selectedCategory === category))
  ].join("");
}

function renderSaved() {
  const savedJobs = jobs.filter((job) => state.savedJobIds.has(job.id));
  savedEmpty.hidden = savedJobs.length !== 0;
  savedJobsList.innerHTML = savedJobs.map((job) => createJobCard(job)).join("");
}

function renderAiResults(results) {
  aiEmpty.hidden = results.length !== 0;
  aiResults.innerHTML = results.map((job) => createMatchCard(job)).join("");
}

function renderScannerResults(results) {
  scannerEmpty.hidden = results.length !== 0;
  scannerHighlight.hidden = results.length === 0;
  scannerResults.innerHTML = results.slice(0, 4).map((job) => createMatchCard(job)).join("");

  if (results.length > 0) {
    scannerHighlightCard.innerHTML = createScannerHighlight(results[0]);
  } else {
    scannerHighlightCard.innerHTML = "";
    scannerResults.innerHTML = "";
  }
}

function renderOwnerPanel() {
  ownerPanel.hidden = !state.ownerUnlocked;
  ownerGate.hidden = state.ownerUnlocked;
}

function renderAuthState() {
  authScreen.hidden = state.currentUser !== null;
  authUserButton.title = state.currentUser ? state.currentUser.email : "Guest";
}

function renderCompanyRequests() {
  companyRequestEmpty.hidden = state.companyRequests.length !== 0;
  companyRequestList.innerHTML = state.companyRequests.map((request) => createCompanyRequestCard(request)).join("");
}

function renderEmailAlerts() {
  emailAlertEmpty.hidden = state.emailAlerts.length !== 0;
  emailAlertList.innerHTML = state.emailAlerts.map((alert) => createEmailAlertCard(alert)).join("");
}

function updateApplicationOfferText(message = "") {
  offerRemaining.textContent = String(state.freeApplicationsRemaining);
  jobsApplicationStatus.textContent =
    message !== ""
      ? message
      : state.freeApplicationsRemaining > 0
        ? `First ${state.freeApplicationsRemaining} free applicant slots are still open.`
        : "Free applications are closed. New applications cost Rs 199 each.";
}

function runAiMatch() {
  const results = rankJobs(state.aiMatchFilters);
  aiResultSummary.textContent =
    results.length > 0
      ? `${results.length} ranked match${results.length === 1 ? "" : "es"} based on your filters`
      : "No strong matches yet.";
  renderAiResults(results);
}

function runResumeScan() {
  const trimmedText = state.resumeScanText.trim();
  if (trimmedText === "") {
    scannerResultSummary.textContent = "Paste your resume text to score it against the current jobs.";
    scannerHighlight.hidden = true;
    scannerEmpty.hidden = true;
    scannerResults.innerHTML = "";
    scannerHighlightCard.innerHTML = "";
    return;
  }

  const results = scanResumeText(trimmedText);
  scannerResultSummary.textContent =
    results.length > 0
      ? `Top match found from your resume across ${results.length} relevant role${results.length === 1 ? "" : "s"}`
      : "No clear resume match found yet.";
  renderScannerResults(results);
}

function syncAllViews() {
  setStats();
  renderHome();
  renderJobs();
  renderSaved();
  runAiMatch();
  runResumeScan();
  renderOwnerPanel();
  renderCompanyRequests();
  renderEmailAlerts();
  updateApplicationOfferText();
}

function toggleSavedJob(jobId) {
  if (state.savedJobIds.has(jobId)) {
    state.savedJobIds.delete(jobId);
  } else {
    state.savedJobIds.add(jobId);
  }
  syncAllViews();
}

function submitApplication(jobId) {
  const job = jobs.find((item) => item.id === jobId);
  if (!job || !state.currentUser) {
    if (!state.currentUser) {
      authStatus.textContent = "Login or sign up before applying for jobs.";
      authStatus.style.color = "#ff8ca6";
      authScreen.hidden = false;
    }
    return;
  }

  if (state.freeApplicationsRemaining > 0) {
    state.freeApplicationsRemaining -= 1;
    updateApplicationOfferText(`Application submitted for ${job.title}. Free slot used successfully.`);
  } else {
    updateApplicationOfferText(`Application for ${job.title} now requires payment of Rs 199.`);
  }

  state.emailAlerts.unshift({
    email: state.currentUser.email,
    category: job.category,
    message: `Application successful for ${job.title}. Confirmation alert recorded for ${state.currentUser.email}.`
  });

  renderHome();
  renderJobs();
  renderSaved();
  runAiMatch();
  runResumeScan();
  renderEmailAlerts();
}

document.addEventListener("click", (event) => {
  const tabButton = event.target.closest("[data-tab]");
  if (tabButton) {
    switchTab(tabButton.dataset.tab);
    return;
  }

  const switcher = event.target.closest("[data-switch-tab]");
  if (switcher) {
    switchTab(switcher.dataset.switchTab);
    return;
  }

  const categoryButton = event.target.closest("[data-category]");
  if (categoryButton) {
    state.selectedCategory = categoryButton.dataset.category;
    switchTab("jobs");
    renderJobs();
    return;
  }

  const categoryChip = event.target.closest("[data-category-filter]");
  if (categoryChip) {
    state.selectedCategory = categoryChip.dataset.categoryFilter;
    renderJobs();
    return;
  }

  const saveButton = event.target.closest("[data-save-job]");
  if (saveButton) {
    toggleSavedJob(saveButton.dataset.saveJob);
    return;
  }

  const applyButton = event.target.closest("[data-apply-job]");
  if (applyButton) {
    submitApplication(applyButton.dataset.applyJob);
  }
});

jobSearchInput.addEventListener("input", renderJobs);
modeFilterInput.addEventListener("change", renderJobs);
experienceFilterInput.addEventListener("change", renderJobs);

matchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  state.aiMatchFilters = {
    role: matchRoleInput.value,
    experience: matchExperienceInput.value,
    mode: matchModeInput.value,
    skills: matchSkillsInput.value.trim().toLowerCase()
  };
  runAiMatch();
});

scannerForm.addEventListener("submit", (event) => {
  event.preventDefault();
  state.resumeScanText = resumeTextInput.value;
  runResumeScan();
});

ownerUnlockButton.addEventListener("click", () => {
  if (ownerCodeInput.value.trim() === OWNER_CODE) {
    state.ownerUnlocked = true;
    ownerStatus.textContent = "Owner access granted.";
    ownerStatus.style.color = "#c5a7ff";
    renderOwnerPanel();
  } else {
    ownerStatus.textContent = "Incorrect owner code.";
    ownerStatus.style.color = "#ff8ca6";
  }
});

ownerJobForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!state.ownerUnlocked) {
    ownerFormStatus.textContent = "Unlock the owner panel before adding jobs.";
    ownerFormStatus.style.color = "#ff8ca6";
    return;
  }

  const newJob = {
    id: `job-${Date.now()}`,
    title: ownerTitleInput.value.trim(),
    company: ownerCompanyInput.value.trim(),
    location: ownerLocationInput.value.trim(),
    mode: ownerModeInput.value,
    salary: ownerSalaryInput.value.trim(),
    category: ownerCategoryInput.value,
    experience: ownerExperienceInput.value,
    skills: ownerSkillsInput.value
      .split(",")
      .map((skill) => skill.trim().toLowerCase())
      .filter(Boolean),
    hot: ownerHotInput.checked,
    isNew: ownerNewInput.checked,
    description: ownerDescriptionInput.value.trim()
  };

  jobs.unshift(newJob);
  ownerJobForm.reset();
  ownerFormStatus.textContent = `${newJob.title} added to the live job list.`;
  ownerFormStatus.style.color = "#c5a7ff";
  syncAllViews();
});

companyJobForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const request = {
    companyName: companyNameInput.value.trim(),
    contactPerson: companyContactPersonInput.value.trim(),
    email: companyEmailInput.value.trim(),
    jobTitle: companyJobTitleInput.value.trim(),
    mode: companyJobModeInput.value,
    salary: companyJobSalaryInput.value.trim(),
    details: companyJobDetailsInput.value.trim()
  };

  state.companyRequests.unshift(request);
  companyJobForm.reset();
  companyFormStatus.textContent = `Listing request submitted for ${request.jobTitle}.`;
  companyFormStatus.style.color = "#c5a7ff";
  renderCompanyRequests();
});

emailAlertForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const alert = {
    email: alertEmailInput.value.trim(),
    category: alertCategoryInput.value,
    message: `Subscribed for new ${alertCategoryInput.value} roles from UVS ACHIEVER.`
  };

  state.emailAlerts.unshift(alert);
  emailAlertForm.reset();
  emailAlertStatus.textContent = `Email alert subscription added for ${alert.email}.`;
  emailAlertStatus.style.color = "#c5a7ff";
  renderEmailAlerts();
});

showLoginButton.addEventListener("click", () => {
  loginForm.hidden = false;
  signupForm.hidden = true;
  showLoginButton.classList.add("active-auth");
  showSignupButton.classList.remove("active-auth");
});

showSignupButton.addEventListener("click", () => {
  loginForm.hidden = true;
  signupForm.hidden = false;
  showSignupButton.classList.add("active-auth");
  showLoginButton.classList.remove("active-auth");
});

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  state.currentUser = {
    name: loginEmailInput.value.trim().split("@")[0],
    email: loginEmailInput.value.trim()
  };
  authStatus.textContent = `Logged in as ${state.currentUser.email}.`;
  authStatus.style.color = "#c5a7ff";
  renderAuthState();
  loginForm.reset();
});

signupForm.addEventListener("submit", (event) => {
  event.preventDefault();
  state.currentUser = {
    name: signupNameInput.value.trim(),
    email: signupEmailInput.value.trim()
  };
  authStatus.textContent = `Account created for ${state.currentUser.email}.`;
  authStatus.style.color = "#c5a7ff";
  renderAuthState();
  signupForm.reset();
});

syncAllViews();
renderAuthState();
switchTab("home");
