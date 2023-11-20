<script setup>
import question from "../components/question.vue";
import quizHeader from "../components/quiz-header.vue";
import result from "../components/result.vue";
import { useRoute } from "vue-router";
import { ref, watch, computed } from "vue";
import quizes from "../data/quizes.json"

const route = useRoute()

const quizId = parseInt(route.params.id)

const quiz = quizes.find(q => q.id === quizId)

const currentQuestionIndex = ref(0)
const numberOfCorrectAnswers = ref(0)
const showResults = ref(false)

// step 1: define state. At this step there's no definition of changes
// const questionStatus = ref(`${currentQuestionIndex.value}/${quiz.questions.length}`)

// step 2: define the action of changes, 
// not necessary only changes or action related to questionStatus. It could do more
// watch(() => currentQuestionIndex.value, () => {
//     questionStatus.value = `${currentQuestionIndex.value}/${quiz.questions.length}`
// })

const questionStatus = computed(() => `${currentQuestionIndex.value}/${quiz.questions.length}`)
const barPercentage = computed(() => `${currentQuestionIndex.value / quiz.questions.length * 100}%`)

const onOptionSelected = (isCorrect) => {
    if (isCorrect) {
        numberOfCorrectAnswers.value++;
    }


    if (quiz.questions.length - 1 === currentQuestionIndex.value) {
        showResults.value = true;
    }

    currentQuestionIndex.value++
}

</script>

<template>
    <div>
        <quizHeader :questionStatus="questionStatus" :barPercentage="barPercentage" />
        <div>
            <question v-if="!showResults" :question="quiz.questions[currentQuestionIndex]"
                @selectOption="onOptionSelected" />
            <result 
                v-else 
                :quizQuestionLength="quiz.questions.length"
                :numberOfCorrectAnswers="numberOfCorrectAnswers"
            />
        </div>
        <!-- <button @click="currentQuestionIndex++">Next Question</button> -->
    </div>
</template>