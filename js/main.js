const { createApp } = Vue;

const app = createApp({
    data () {
        return {
        tasksList: [
            {
            text: "Task 1",
            done: false,
            completedAt: null,
            },
            {
            text: "Task 2",
            done: false,
            completedAt: null,
            },
            {
            text: "Task 3",
            done: false,
            completedAt: null,
            },
            {
            text: "Task 4",
            done: false,
            completedAt: null,
            }
        ],
        filteredTasksList: [],
        filtroAttivo: "",
        newTaskData: {
            text: "",
        },
        };
    },
    methods: {
        onFormSubmit () {

        this.tasksList.push({
            ...this.newTaskData,

            done: false,
            completedAt: null,
        });

        // invoco la funzione che mi fa partire il timer
        this.startTaskCountdown(this.tasksList[this.tasksList.length - 1]);

        // reset dei dati collegati agli input
        this.newTaskData.text = "";
        this.newTaskData.category = "";
        },
        /**
         * 
         * @param {*} task 
         */
        startTaskCountdown (task) {
        // per il task passato come argomento, faccio partire un timer
        task.intervalTimer = setInterval(() => {
            task.countdown--;

            // controllo se sono arrivato a 0
            if (task.countdown === 0) {
            // blocco il timer
            clearInterval(task.intervalTimer);

            // segno come fatto il task
            task.done = true;
            }
        }, 1000);
        },

        filterByToDoTasks () {
        // return this.tasksList.filter(task => task.done === false);

        // assegno come valore di filteredTasksList SOLO gli elementi che corrispondono al mio filtro
        /* this.filteredTasksList = this.tasksList.filter(function (task) {
            // ritorno un booleano. Se TRUE il task corrente verrà inserito nell'array finale, 
            // altrimenti verrò ignorato
            return task.done === false;
        }); */

        this.filtroAttivo = "daFare";
        },
        filterByDoneTasks () {
        // assegno come valore di filteredTasksList SOLO gli elementi che corrispondono al mio filtro
        // this.filteredTasksList = this.tasksList.filter(task => task.done === true);

        this.filtroAttivo = "fatto";
        },
        resetFilters () {
        // assegno come valore di filteredTasksList TUTTI gli elementi dell'array originale
        // this.filteredTasksList = this.tasksList;

        this.filtroAttivo = "";
        },

        /**
         * Ritorna l'array dei task già filtrati
         */
        getFilteredTasks () {
        return this.tasksList.filter((task) => {
            // che filtri ho attivi ?
            if (this.filtroAttivo === "daFare") {
            return task.done === false;
            } else if (this.filtroAttivo === "fatto") {
            return task.done === true;
            }

            return true;
        });
        },

        /**
         * Cancella un elemento dall'array in base al suo indice
         * @param {number} indexToDelete 
         */
        onTaskDeleteBtnClick (indexToDelete) {
        const confirmed = confirm("Sei sicuro di voler cancellare questo task?");

        if (confirmed) {
            this.tasksList.splice(indexToDelete, 1);
        }
        },
    },
    mounted () {
        this.resetFilters();
    }
}).mount('#app');