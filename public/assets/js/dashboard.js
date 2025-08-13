
window.addEventListener('pageshow', function (event) {
    if (event.persisted || (window.performance && window.performance.navigation.type === 2)) {
        // If coming from bfcache (Back/Forward cache), reload to enforce revalidation
        window.location.reload();
    }
});


// $(document).ready(function () {
//     if (!$.fn.DataTable.isDataTable('#requestsTable')) {
//         $('#requestsTable').DataTable({
//             pageLength: 5,
//             responsive: true,
//             autoWidth: false,
//         });
//     }
// });


function deleteRequest(referenceNo) {
    Swal.fire({
        title: 'Are you sure?',
        text: "You are about to cancel this request.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, cancel it!'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: `/user/request/${referenceNo}`,
                method: 'DELETE',
                success: function (response) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Cancelled!',
                        text: 'Your request has been successfully cancelled.',
                        timer: 2000,
                        showConfirmButton: false
                    }).then(() => {
                        window.location.href = '/Home';
                    });
                },
                error: function (xhr) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error!',
                        text: xhr.responseJSON?.message || 'Failed to cancel the request.',
                    });
                }
            });
        }
    });
}

$(document).ready(function () {
    $('#logout-link').on('click', function (e) {
        e.preventDefault();

        console.log('reached')
        $.ajax({
            type: 'POST',
            url: '/auth/logout',
            contentType: 'application/json',
            success: function (response) {
                showToast("Success", "Logged out in successfully", "text-success");
                window.location.href = '/login'
            },
            error: function (xhr) {
                let message = "Request failed. Please try again.";
                if (xhr.responseJSON && xhr.responseJSON.message) {
                    message = xhr.responseJSON.message;
                }
                showToast("Error", message, "text-danger");
                return;
            },
        });
    })

    function showToast(title, body, titleClass) {
        const toastHtml = `
                <div class="toast align-items-center text-bg-light border-0" role="alert" aria-live="assertive" aria-atomic="true" data-bs-delay="5000">
                    <div class="toast-header">
                        <strong class="me-auto ${titleClass}">${title}</strong>
                        <small class="text-muted">Now</small>
                        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                    </div>
                    <div class="toast-body">${body}</div>
                </div>`;

        const $toast = $(toastHtml);
        $('.toast-container').append($toast);
        const toast = new bootstrap.Toast($toast[0]);
        toast.show();
    }
})

$(document).ready(function () {
    const currentPath = window.location.pathname;
    console.log("Current Path:", currentPath);

    $(".nk-menu-link").each(function () {
        const linkPath = new URL(this.href).pathname;
        console.log("Link Path:", linkPath);
        if (linkPath === currentPath) {
            $(this).addClass("active");
        } else {
            $(this).removeClass("active");
        }
    });
});

$(document).ready(function () {
    // Initialize the Bootstrap modal instance
    const myModal = new bootstrap.Modal(document.getElementById('requestDetailsModal'));

    /**
     * Populates and displays the request details modal.
     * @param {object} requestData - The data object for a single request.
     */
    window.showRequestDetails = function (requestData) {
        console.log('requestData:', requestData)
        // Populate main details
        $('#detail_reference_no').text(requestData.reference_no || '');
        $('#detail_email').text(requestData.email || '');
        $('#detail_organization').text(requestData.organization || '');
        $('#detail_purpose').text(requestData.purpose || '');

        // Format dates
        $('#detail_visitFrom').text(requestData.visitFrom ? new Date(requestData.visitFrom).toLocaleDateString() : '');
        $('#detail_visitTo').text(requestData.visitTo ? new Date(requestData.visitTo).toLocaleDateString() : '');

        // Handle Department name (assuming it might be a nested object or null)
        $('#detail_department').text(requestData.Department?.name || '');

        // Format status (capitalize first letter)
        $('#detail_status').text(requestData.status ? (requestData.status.charAt(0).toUpperCase() + requestData.status.slice(1)) : '');

        // Populate Visitors list
        const $otherMembersList = $('#detail_otherMembers');
        $otherMembersList.empty(); // Clear previous entries

        if (requestData.RequestParticipants && requestData.RequestParticipants.length > 0) {
            $.each(requestData.RequestParticipants, function (index, member) {
                const $listItem = $('<li></li>').addClass('d-flex align-items-center mb-1'); // Flex for icon/text alignment
                const $memberName = $('<span></span>').text(member.firstName);

                if (member.filePath) {
                    const fileExtension = member.filePath.split('.').pop().toLowerCase();
                    let iconClass = 'bi-file-earmark'; // Default document icon

                    // Assign specific icons based on file type
                    if (fileExtension === 'pdf') {
                        iconClass = 'bi-file-earmark-pdf';
                    } else if (['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension)) {
                        iconClass = 'bi-file-earmark-image';
                    }
                    // Add more conditions for other file types if needed

                    const $icon = $('<i></i>').addClass(`bi ${iconClass} me-2 text-primary`); // Add Bootstrap icon
                    const $link = $('<a></a>')
                        .attr('href', member.filePath)
                        .attr('target', '_blank') // Open in new tab
                        .addClass('text-primary text-decoration-underline')
                        .append($memberName); // Put the name inside the link

                    $listItem.append($icon).append($link);

                } else {
                    $listItem.append($memberName); // Just the name if no file path
                }

                $otherMembersList.append($listItem);
            });
        } else {
            $otherMembersList.append($('<li>N/A</li>')); // Display N/A if no visitors
        }

        // Uncheck all zone checkboxes initially (since provided data doesn't specify them)
        $('#requestDetailsModal input[type="checkbox"]').prop('checked', false);

        // Display the modal using Bootstrap's show method
        myModal.show();
    };

    // This function is less commonly used directly for the Bootstrap close button,
    // as data-bs-dismiss="modal" handles it. But useful if you want to close via JS.
    window.closeModal = function () {
        myModal.hide();
    };

    /**
     * Fetches request details from the backend and then displays them in the modal.
     * This assumes your Express backend route is GET /api/requests/:reference_no
     * @param {string} referenceNo - The reference number of the request to fetch.
     */
    window.fetchAndShowDetails = function (referenceNo) {
        $.ajax({
            url: `/user/request/${referenceNo}`, // <--- IMPORTANT: Adjust this URL to your actual API endpoint if different
            method: 'GET', // Method is GET as per our discussion for fetching by URL parameter
            success: function (response) {
                // Assuming your controller sends a JSON object like { success: true, data: {...} }
                if (response.success && response.data) {
                    showRequestDetails(response.data); // Pass the 'data' part of your response
                } else {
                    console.error('Failed to fetch request details:', response.message);
                    // Use a custom message box instead of alert() in production apps
                    alert('Could not fetch request details: ' + (response.message || 'Unknown error.'));
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.error('Error fetching request details:', textStatus, errorThrown, jqXHR.responseText);
                // Use a custom message box instead of alert() in production apps
                alert('An error occurred while fetching details. Please try again.');
            }
        });
    };


}); // End of document.ready
