/*
 * Copyright (C) 2018 - present Instructure, Inc.
 *
 * This file is part of Canvas.
 *
 * Canvas is free software: you can redistribute it and/or modify it under
 * the terms of the GNU Affero General Public License as published by the Free
 * Software Foundation, version 3 of the License.
 *
 * Canvas is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU Affero General Public License for more
 * details.
 *
 * You should have received a copy of the GNU Affero General Public License along
 * with this program. If not, see <http://www.gnu.org/licenses/>.
 */

import I18n from 'i18n!assignment_grade_summary'

function normalizeGraders() {
  const graders = ENV.GRADERS.map(grader => ({
    graderId: grader.user_id || grader.anonymous_id,
    graderName: grader.grader_name || null,
    id: grader.id
  }))

  graders.sort((a, b) => (a.graderId < b.graderId ? -1 : 1))

  graders.forEach((grader, index) => {
    /* eslint-disable no-param-reassign */
    grader.graderName =
      grader.graderName || I18n.t('Grader %{graderNumber}', {graderNumber: I18n.n(index + 1)})
    /* eslint-enable no-param-reassign */
  })

  return graders
}

export default function getEnv() {
  return {
    assignment: {
      courseId: ENV.ASSIGNMENT.course_id,
      id: ENV.ASSIGNMENT.id,
      muted: ENV.ASSIGNMENT.muted,
      gradesPublished: ENV.ASSIGNMENT.grades_published,
      title: ENV.ASSIGNMENT.title
    },

    graders: normalizeGraders()
  }
}
