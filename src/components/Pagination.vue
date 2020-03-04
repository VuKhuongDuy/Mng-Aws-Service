<template>
  <nav>
    <ul class="pagination">
      <li v-if="pagination.current_page > 1">
        <a
          href="#"
          aria-label="Previous"
          id="prevent"
          v-on:click.prevent="changePage(pagination.current_page - 1)"
        >
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li
        v-for="(page, key) in pagesNumber"
        id="current"
        :key="key"
        :class="{ active: page == pagination.current_page }"
      >
        <a href="#" v-on:click.prevent="changePage(page)">{{ page }}</a>
      </li>
      <li v-if="pagination.current_page < pagination.last_page">
        <a
          href="#"
          aria-label="Next"
          id="next"
          v-on:click.prevent="changePage(pagination.current_page + 1)"
        >
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>
<script>
export default {
  name: "pagination",
  props: {
    pagination: {
      type: Object,
      required: false,
      default: () => {
        return {
          total: 1,
          per_page: 2,
          last_page: 0,
          from: 1,
          to: 1,
          current_page: 1,
          counts: 8
        };
      }
    },
    offset: {
      type: Number,
      default: 4
    }
  },
  computed: {
    pagesNumber: function() {
      /* istanbul ignore next */
      if (!this.pagination.to) {
        return [];
      }
      var from = this.pagination.current_page - this.offset;
      /* istanbul ignore next */

      if (from < 1) {
        from = 1;
      }
      var to = from + this.offset * 2;
      /* istanbul ignore next */

      if (to >= this.pagination.last_page) {
        to = this.pagination.last_page;
      }
      var pagesArray = [];
      /* istanbul ignore next */

      for (from = 1; from <= to; from++) {
        pagesArray.push(from);
      }

      return pagesArray;
    }
  },
  methods: {
    changePage: function(page) {
      this.pagination.current_page = page;
    }
  }
};
</script>
