<template>
  <div class="container">
    <h2 class="text-center">🎓 Student Management</h2>

    <!-- Add Form -->
    <form @submit.prevent="saveStudent" class="card p-3 shadow-sm mb-3">
      <div class="form-group mb-2">
        <label>Name</label>
        <input v-model="form.name" type="text" class="form-control" required />
      </div>

      <div class="form-group mb-2">
        <label>Birthdate</label>
        <input v-model="form.birthdate" type="date" class="form-control" required />
      </div>

      <div class="form-group mb-2">
        <label>Department</label>
        <select v-model="form.department_id" class="form-control" required>
          <option value="">Select Department</option>
          <option v-for="dept in departments" :key="dept.id" :value="dept.id">
            {{ dept.name }}
          </option>
        </select>
      </div>

      <button type="submit" class="btn btn-primary w-100 mt-2">
        {{ form.id ? "Update" : "Add" }} Student
      </button>
    </form>

    <!-- Student List -->
    <div class="card shadow-sm">
      <div class="card-body">
        <h5>Student List</h5>
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Birthdate</th>
              <th>Department</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(student, index) in students" :key="student.id">
              <td>{{ index + 1 }}</td>
              <td>{{ student.name }}</td>
              <td>{{ student.birthdate }}</td>
              <td>{{ student.department?.name || '—' }}</td>
              <td>
                <button @click="editStudent(student)" class="btn btn-sm btn-warning me-2">
                  Edit
                </button>
                <button @click="deleteStudent(student.id)" class="btn btn-sm btn-danger">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import studentService from "./services/studentService";
import departmentService from "./services/departmentService";

export default {
  data() {
    return {
      students: [],
      departments: [],
      form: {
        id: null,
        name: "",
        birthdate: "",
        department_id: "",
      },
    };
  },
  methods: {
    loadStudents() {
      studentService.getAll().then((res) => {
        this.students = res.data;
      });
    },
    loadDepartments() {
      departmentService.getAll().then((res) => {
        this.departments = res.data;
      });
    },
    saveStudent() {
      if (this.form.id) {
        // Update
        studentService.update(this.form.id, this.form).then(() => {
          this.loadStudents();
          this.resetForm();
        });
      } else {
        // Create
        studentService.create(this.form).then(() => {
          this.loadStudents();
          this.resetForm();
        });
      }
    },
    editStudent(student) {
      this.form = { ...student };
    },
    deleteStudent(id) {
      if (confirm("Are you sure you want to delete this student?")) {
        studentService.delete(id).then(() => this.loadStudents());
      }
    },
    resetForm() {
      this.form = { id: null, name: "", birthdate: "", department_id: "" };
    },
  },
  mounted() {
    this.loadStudents();
    this.loadDepartments();
  },
};
</script>

<style>
.container {
  max-width: 800px;
  margin: 30px auto;
}
</style>
