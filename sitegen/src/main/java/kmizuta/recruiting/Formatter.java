package kmizuta.recruiting;

import java.io.PrintWriter;
import java.util.HashMap;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.concurrent.atomic.AtomicInteger;

public class Formatter {
    
    private Recruiting recruiting;
    String newLine = System.getProperty("line.separator");

    public Formatter(Recruiting recruiting) {
        this.recruiting = recruiting;
    }

    public void print(Target target) {

    }

    public void printOnline(PrintWriter writer) {

        writer.println(
            "<html>" + newLine + 
            "  <head>" + newLine + 
            "    <title>Oracle - Technical Architecture Openings</title>" + newLine );

        printStyle(Target.ONLINE, writer);

        writer.println(
            "  </head>" + newLine +
            newLine +
            "  <body>" + newLine +
            "    <script>" + newLine +
            "      const urlParams = new URLSearchParams(window.location.search);" + newLine +
            "      var style = document.createElement('style');" + newLine +
            "      style.type = 'text/css';" + newLine +
            "      if (\"true\" === urlParams.get(\"internal\")) {" + newLine +
            "      style.innerHTML = '.internal { background-color: yellow; }';" + newLine +
            "      } else {" + newLine +
            "      style.innerHTML = '.internal { display:none; }';" + newLine +
            "      }" + newLine +
            "      document.getElementsByTagName('head')[0].appendChild(style);" + newLine +
            "    </script>" + newLine + newLine);
      
      printTable(Target.ONLINE, writer);

      writer.println(newLine +
            "  </body>" + newLine +
            "</html>" + newLine);
    }

    public void printConfluence(PrintWriter writer) {
        printStyle(Target.CONFLUENCE, writer);
        printTable(Target.CONFLUENCE, writer);
    }


    private void printStyle(Target online, PrintWriter writer) {
     writer.println("     <style>" + newLine);
     if (online == Target.ONLINE) {
        writer.println(
        "      body {" + newLine +
        "          background-image: url(\"https://kmizuta.github.io/resources/redwood-strip.png\");" + newLine +
        "          background-repeat: repeat-x;" + newLine +
        "      }" + newLine +
        "      table.hiring {" + newLine +
        "          position: absolute;" + newLine +
        "          top: 30px;" + newLine +
        "          left: 50%;" + newLine +
        "          transform: translate(-50%, 0%);" + newLine +
        "      }" + newLine);
     } else {
        writer.println(
        "      .internal {" + newLine +
        "          display:none;" + newLine +
        "      }" + newLine
        );
     }
     writer.println(
        "      table.hiring {" + newLine +
        (online == Target.CONFLUENCE ? "          margin: auto;" + newLine : "") +
        "          font-family: 'Oracle Sans',-apple-system,BlinkMacSystemFont,\"Segoe UI\",\"Helvetica Neue\",Arial,sans-serif;" + newLine +
        "          table-layout: fixed;" + newLine +
        "          width: 80%;" + newLine +
        "      }" + newLine +
        "      table.hiring, table.hiring th, table.hiring td {" + newLine +
        "          border-collapse: collapse;" + newLine +
        "          border-color: gray;" + newLine +
        "          border: 1px solid;" + newLine +
        "          padding: 10px;" + newLine +
        "      }" + newLine +
        "      table.hiring th {" + newLine +
        "          background-color: #F4F5F7;" + newLine +
        "      }" + newLine +
        "      table.hiring td {" + newLine +
        "          vertical-align: top;" + newLine +
        "      }" + newLine +
        "      .area {" + newLine +
        "      }" + newLine +
        "      .description {" + newLine +
        "          width: 500px" + newLine +
        "	    }" + newLine +
        "      .country {" + newLine +
        "      }" + newLine +
        "      .manager {" + newLine +
        "      }" + newLine +
        "      .req {" + newLine +
        "      }" + newLine +
        "      .status {" + newLine +
        "          width: 400px;" + newLine +
        "      }" + newLine +
        "    </style>" + newLine);
    }

    private void printTable(Target target, PrintWriter writer) {
        writer.println(
            "   <table class=\"hiring\">" + newLine +
            "      <tr>" + newLine +
            "	<th class=\"area\">Area</th>" + newLine +
            "	<th class=\"description\">Description</th>" + newLine +
            "	<th class=\"country\">Country</th>" + newLine +
            "	<th class=\"manager\">Hiring Manager</th>" + newLine +
            "	<th class=\"req\">Level - Job Req</th>" + newLine +
            "	<th class=\"status internal\">Status</th>" + newLine +
            "      </tr>	" + newLine );

        recruiting.hiring.forEach(hiringArea -> {
            final AtomicBoolean isFirstCountry = new AtomicBoolean(true);

	    final AtomicBoolean serviceHasOpenReq = new AtomicBoolean(false);
            final AtomicInteger countriesWithOpenReqs = new AtomicInteger(0);
            final HashMap<String, Boolean> countryHasOpenReq = new HashMap<>();
            hiringArea.countries.forEach(country -> {
                AtomicBoolean hasOpenReqs = new AtomicBoolean(false);
                country.jobreqs.forEach(jobreq -> {
			if ("open".equals(jobreq.status)) {
			    hasOpenReqs.set(true);
			    serviceHasOpenReq.set(true);
			}
		    });
                if (hasOpenReqs.get()) countriesWithOpenReqs.incrementAndGet();
                countryHasOpenReq.put(country.country, hasOpenReqs.get());
            });

            hiringArea.countries.forEach( country -> {
                Recruiting.Manager manager = recruiting.managers.get(country.manager);
                String managerLine;
                if (target == Target.ONLINE) {
                    if (!isEmpty(manager.linkedInId))
                        managerLine = String.format("<a href=\"https://www.linkedin.com/in/%s/\">%s</a>", manager.linkedInId, manager.name);
                    else if (!isEmpty(manager.email))
                        managerLine = String.format("<a href=\"mailto:%s\">%s</a>", manager.email, manager.name);
                    else
                        managerLine = manager.name;
                } else { // Target.CONFLUENCE
                    managerLine = String.format("<a href=\"https://people.oracle.com/@%s\">%s</a>", country.manager, manager.name);
                }
                
                final StringBuilder jobReqLine = new StringBuilder();
                final StringBuilder notesLine = new StringBuilder();
                final int jobreqCount = country.jobreqs.size();
                final AtomicInteger currentJobreqIdx = new AtomicInteger(0);
                country.jobreqs.forEach( jobreq -> {
                    int currentIdx = currentJobreqIdx.incrementAndGet();

                    boolean isInternal = ! "open".equals(jobreq.status);
                    boolean isDeleted = "closed".equals(jobreq.status) || "filled".equals(jobreq.status);
                    jobReqLine.append(isInternal ? "<span class=\"internal\">" : "")
                            .append(isDeleted ? "<del>":"")
                            .append("<a href=\"https://careers.oracle.com/jobs/#en/sites/jobsearch/requisitions/preview/")
                            .append(jobreq.reqno).append("\">").append(jobreq.level).append(" - ").append(jobreq.reqno).append("</a>");
                    notesLine.append(jobreq.reqno).append(" - ").append(jobreq.notes);

                    if (currentIdx < jobreqCount) {
                        jobReqLine.append("<br>").append(isDeleted ? "</del>":"").append(isInternal ? "</span>":"").append(newLine);
                        notesLine.append("<br>").append(newLine);
                    }
                });

                boolean hasOpenReq = countryHasOpenReq.get(country.country);
		String serviceInternal = serviceHasOpenReq.get() ? "" : "class=\"internal\"";
                if (isFirstCountry.get()) {
                    int countryCount = hasOpenReq ? countriesWithOpenReqs.get() : 1;
                    writer.println(String.format(
                        (hasOpenReq ? "<tr>" : "<tr class=\"internal\">") + newLine + 
                        "  <td rowspan=%d %s>%s</td>" + newLine +
                        "  <td rowspan=%d %s>%s</td>" + newLine +
                        "  <td>%s</td>" + newLine +
                        "  <td>%s</td>" + newLine +
                        "  <td>%s</td>" + newLine +
                        "  <td class=\"internal\">%s" + newLine +
                        "  </td>" + newLine +
                        "</tr>" + newLine,
                        countryCount, serviceInternal, hiringArea.area,
			countryCount, serviceInternal, hiringArea.description, 
                        country.country, managerLine, jobReqLine.toString(), notesLine.toString()
                    ));
                    if (hasOpenReq) isFirstCountry.set(false);
                } else {
                    writer.println(String.format(
                        (hasOpenReq ? "<tr>" : "<tr class=\"internal\"><td></td><td></td>") + newLine +
                        "  <td>%s</td>" + newLine +
                        "  <td>%s</td>" + newLine +
                        "  <td>%s</td>" + newLine +
                        "  <td class=\"internal\">%s" + newLine +
                        "  </td>" + newLine +
                        "</tr>" + newLine,
                        country.country, managerLine, jobReqLine.toString(), notesLine.toString()
                    ));
                }
            });

        });
        writer.println("</table>");
    }

    private boolean isEmpty(String s) {
        return s == null || "".equals(s);
    }

}
