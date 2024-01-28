package kmizuta.recruiting.mustache;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@AllArgsConstructor
@Setter
@Getter
public class RecruitingModel {
    
    boolean online;
    List<AreaModel> areas;    
    
}
